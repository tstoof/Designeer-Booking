import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchAvailabilities, createAvailability } from '../components/api';
import { Snackbar, Alert, type AlertColor } from '@mui/material';


export default function CalendarSlotPicker() {
  const [events, setEvents] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await fetchAvailabilities();

    const formattedEvents = data.map((slot: any) => ({
      id: slot.id,
      title: slot.isBooked ? 'Booked' : 'Available',
      start: `${slot.date}T${slot.startTime}`,
      end: `${slot.date}T${slot.endTime}`,
      color: slot.isBooked ? '#d32f2f' : '#388e3c', // Red if booked, green if not
      editable: false,
    }));

    setEvents(formattedEvents);
  };

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
      loadEvents(); // Refresh calendar
    } catch (error) {
      setSnack({ open: true, message: 'Error creating availability.', severity: 'error' });
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
  height="auto"
  allDaySlot={false}
  slotDuration="00:30:00"
  scrollTime="09:00:00"           // Start scrolling at 9 AM
  slotMinTime="07:00:00"          // Earliest visible time you can scroll to
  slotMaxTime="20:00:00"          // Latest visible time you can scroll to
  headerToolbar={{
    start: 'prev,next today',
    center: 'title',
    end: 'timeGridWeek,timeGridDay',
  }}
  businessHours={{
    daysOfWeek: [1, 2, 3, 4, 5],  // Monday to Friday
    startTime: '09:00',
    endTime: '17:00',
  }}
/>


      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
      <Alert severity={snack.severity as AlertColor} onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
