import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Toolbar from '@mui/material/Toolbar'
import { Link, Outlet, useLocation } from 'react-router-dom'
import '../index.css'
import { Toaster } from 'react-hot-toast'
import { Header } from './header'

export const Layout = () => {
 
  const { pathname } = useLocation()

  return (
    <div className='layout-wrapper'>
      <Header />
      <div>
        <Toolbar>
          <List>
            <ListItem>
              <ListItemButton
                component={Link}
                to='/'
                disabled={pathname == '/'}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {' '}
                  <HomeIcon />{' '}
                </ListItemIcon>
                Home
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to='/booking'
                disabled={pathname == '/booking'}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {' '}
                  <EditCalendarIcon />{' '}
                </ListItemIcon>
                Appoint-
                ment
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to='/availability'
                disabled={pathname == '/availability'}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {' '}
                  <CalendarMonthIcon />{' '}
                </ListItemIcon>
                Availability
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton
                component={Link}
                to='/about'
                disabled={pathname == '/about'}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  {' '}
                  <InfoIcon />{' '}
                </ListItemIcon>
                About
              </ListItemButton>
            </ListItem>

           
            
          </List>
        </Toolbar>
      </div>

      <main>
        <Toaster position='top-center' reverseOrder={false} />
        <Outlet />
      </main>
    </div>
  )
}
