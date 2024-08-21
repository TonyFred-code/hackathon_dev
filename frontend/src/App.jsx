import { useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems } from './components/listItems';
import Dashboard from './components/Dashboard';

import './App.css';

import studentData from '../data/students_list.json';
import classData from '../data/class.json';
import StudentsList from './components/Students';
import Classes from './components/Classes';

const defaultTheme = createTheme();

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function App() {
  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [studentsListOpen, setStudentListOpen] = useState(false);
  const [openClasses, setOpenClasses] = useState(false);
  const [studentsList, setStudentsList] = useState(studentData);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  function openDashBoard() {
    setDashboardOpen(true);
    setStudentListOpen(false);
    setOpenClasses(false);
  }

  function openStudentList() {
    setDashboardOpen(false);
    setStudentListOpen(true);
    setOpenClasses(false);
  }

  function openClassesTab() {
    setDashboardOpen(false);
    setStudentListOpen(false);
    setOpenClasses(true);
  }

  function handleStudentCreate(studentData) {
    const indexes = [];

    studentsList.forEach((s, index) => {
      indexes.push(index + 1);
    });

    const maxIndex = Math.max(...indexes);

    const id = maxIndex + 1;
    const { first_name, last_name, emailAddress, gender } = studentData;

    const student = {
      id,
      first_name,
      last_name,
      parent_contact_info: emailAddress,
      gender,
    };

    setStudentsList([student, ...studentsList]);
    console.log(studentData);
    console.log(id);
  }

  console.log(classData);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={drawerOpen}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {dashboardOpen && 'Dashboard'}
              {studentsListOpen && 'Students List'}
              {openClasses && 'Classes List'}
            </Typography>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant='permanent' open={drawerOpen}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            <ListItemButton selected={dashboardOpen} onClick={openDashBoard}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton
              selected={studentsListOpen}
              onClick={openStudentList}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Students' />
            </ListItemButton>
            <ListItemButton selected={openClasses} onClick={openClassesTab}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Classes' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary='Reports' />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary='Attendance' />
            </ListItemButton>
          </List>
        </Drawer>
        {dashboardOpen && <Dashboard />}
        {studentsListOpen && (
          <StudentsList
            student_list={studentsList}
            onStudentCreate={handleStudentCreate}
            class_list={classData}
          />
        )}
        {openClasses && <Classes />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
