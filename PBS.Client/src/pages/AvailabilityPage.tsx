// import { useState, useEffect } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { fetchAvailabilities, createAvailability } from '../components/api';
// import { Snackbar, Alert, type AlertColor } from '@mui/material';


// export default function AvailabilityPage() {
//   const [events, setEvents] = useState([]);
//   const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

//   useEffect(() => {
//     loadEvents();
//   }, []);

//   const loadEvents = async () => {
//     const data = await fetchAvailabilities();

//     const formattedEvents = data.map((slot: any) => ({
//       id: slot.id,
//       title: slot.isBooked ? 'Booked' : 'Available',
//       start: `${slot.date}T${slot.startTime}`,
//       end: `${slot.date}T${slot.endTime}`,
//       color: slot.isBooked ? '#d32f2f' : '#388e3c', // Red if booked, green if not
//       editable: false,
//     }));

//     setEvents(formattedEvents);
//   };

//   const handleSelect = async (info: any) => {
//     const providerName = prompt('Enter your name:');
//     if (!providerName) return;

//     const slot = {
//       providerName,
//       date: info.startStr.split('T')[0],
//       startTime: info.startStr.split('T')[1].slice(0, 5),
//       endTime: info.endStr.split('T')[1].slice(0, 5),
//     };

//     try {
//       await createAvailability(slot);
//       setSnack({ open: true, message: 'Availability created!', severity: 'success' });
//       loadEvents(); // Refresh calendar
//     } catch (error) {
//       setSnack({ open: true, message: 'Error creating availability.', severity: 'error' });
//     }
//   };

//   return (
//     <>
//       <FullCalendar
//         plugins={[timeGridPlugin, interactionPlugin]}
//         initialView="timeGridWeek"
//         selectable={true}
//         events={events}
//         select={handleSelect}
//         height="auto"
//         allDaySlot={false}
//         slotDuration="00:30:00"
//         scrollTime="09:00:00"           // Start scrolling at 9 AM
//         slotMinTime="07:00:00"          // Earliest visible time you can scroll to
//         slotMaxTime="20:00:00"          // Latest visible time you can scroll to
//         headerToolbar={{
//           start: 'prev,next today',
//           center: 'title',
//           end: 'timeGridWeek,timeGridDay',
//         }}
//         businessHours={{
//           daysOfWeek: [1, 2, 3, 4, 5],  // Monday to Friday
//           startTime: '09:00',
//           endTime: '17:00',
//         }}
//       />


//       <Snackbar
//         open={snack.open}
//         autoHideDuration={3000}
//         onClose={() => setSnack({ ...snack, open: false })}
//       >
//       <Alert severity={snack.severity as AlertColor} onClose={() => setSnack({ ...snack, open: false })}>
//           {snack.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }


import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { 
  fetchAvailabilities, 
  createAvailability, 
  deleteAvailability, 
  updateAvailability 
} from '../components/api';
import {
  Snackbar,
  Alert,
  type AlertColor,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack
} from '@mui/material';

export default function CalendarSlotPicker() {
  const [events, setEvents] = useState<any[]>([]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await fetchAvailabilities();

      const formattedEvents = data.map((slot: any) => ({
        id: slot.id,
        title: slot.isBooked ? 'Booked' : 'Available',
        start: `${slot.date}T${slot.startTime}`,
        end: `${slot.date}T${slot.endTime}`,
        color: slot.isBooked ? '#d32f2f' : '#388e3c', // red or green
        editable: !slot.isBooked,
        isBooked: slot.isBooked,
      }));

      setEvents(formattedEvents);
    } catch {
      setSnack({ open: true, message: 'Failed to load events', severity: 'error' });
    }
  };

  // Create new slot on select
  const handleSelect = async (info: any) => {
    const providerName = prompt('Enter your name:');
    if (!providerName) return;

    const slot = {
      providerName,
      date: info.startStr.split('T')[0],
      startTime: info.startStr.split('T')[1].slice(0, 5),
      endTime: info.endStr.split('T')[1].slice(0, 5),
    };

    try {
      await createAvailability(slot);
      setSnack({ open: true, message: 'Availability created!', severity: 'success' });
      loadEvents();
    } catch {
      setSnack({ open: true, message: 'Error creating availability.', severity: 'error' });
    }
  };

  // Open dialog on event click
  const handleEventClick = (clickInfo: any) => {
    if (clickInfo.event.extendedProps.isBooked) {
      setSnack({ open: true, message: 'Cannot edit or delete a booked slot.', severity: 'warning' });
      return;
    }

    setSelectedEvent(clickInfo.event);
    setEditStartTime(clickInfo.event.startStr.slice(11, 16)); // HH:mm
    setEditEndTime(clickInfo.event.endStr.slice(11, 16));
    setDialogOpen(true);
  };

  const handleUpdate = async () => {
  if (!selectedEvent) return;

  const date = selectedEvent.startStr.split('T')[0];

  const updatedDTO = {
    id: parseInt(selectedEvent.id),
    providerName: selectedEvent.title === 'Available' ? 'Updated Provider' : 'N/A', // or retain original name
    date,
    startTime: editStartTime,
    endTime: editEndTime,
    isBooked: false,
  };

  try {
    await updateAvailability(updatedDTO.id, updatedDTO);
    setSnack({ open: true, message: 'Availability updated.', severity: 'success' });
    setDialogOpen(false);
    loadEvents();
  } catch {
    setSnack({ open: true, message: 'Error updating availability.', severity: 'error' });
  }
};


 
  const handleDelete = async () => {
    if (!selectedEvent) return;

    try {
      await deleteAvailability(selectedEvent.id);
      setSnack({ open: true, message: 'Availability deleted.', severity: 'success' });
      setDialogOpen(false);
      loadEvents();
    } catch {
      setSnack({ open: true, message: 'Error deleting availability.', severity: 'error' });
    }
  };

  return (
    <>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        events={events}
        select={handleSelect}
        eventClick={handleEventClick}
        height="auto"
        allDaySlot={false}
        slotDuration="00:30:00"
        scrollTime="09:00:00"
        slotMinTime="07:00:00"
        slotMaxTime="20:00:00"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'timeGridWeek,timeGridDay',
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '09:00',
          endTime: '17:00',
        }}
      />

      {/* Edit/Delete Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit or Delete Availability</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="Start Time"
              type="time"
              value={editStartTime}
              onChange={(e) => setEditStartTime(e.target.value)}
              inputProps={{ step: 300 }} // 5 min steps
            />
            <TextField
              label="End Time"
              type="time"
              value={editEndTime}
              onChange={(e) => setEditEndTime(e.target.value)}
              inputProps={{ step: 300 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDelete}>Delete</Button>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity as AlertColor} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
