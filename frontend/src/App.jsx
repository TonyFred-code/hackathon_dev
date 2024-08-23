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

import subjectData from '../data/subject.json';
import studentData from '../data/students_list.json';
import classData from '../data/class.json';
import StudentsList from './components/Students';
import Classes from './components/Classes';
import attendanceData from '../data/attendance.json';
import Subjects from './components/Subjects';
import Attendance from './components/Attendance';
import GradeBook from './components/GradeBook';

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
  const defaultTabs = {
    dashboard: true,
    subjects: false,
    attendance: false,
    classes: false,
    grade_book: false,
    students: false,
  };

  const [activeTab, setActiveTab] = useState(defaultTabs);
  const [studentsList, setStudentsList] = useState(studentData);
  const [classList, setClassList] = useState(classData);
  const [attendanceList, setAttendanceList] = useState(attendanceData);
  const [subjectList, setSubjectList] = useState(subjectData);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  function openTab(tab) {
    const keys = Object.keys(activeTab);

    if (!keys.includes(tab)) {
      setActiveTab(defaultTabs);
      return;
    }

    const newActiveTabs = { ...activeTab };

    keys.forEach((key) => {
      if (key === tab) {
        newActiveTabs[key] = true;
      } else {
        newActiveTabs[key] = false;
      }
    });

    setActiveTab(newActiveTabs);
  }

  function openDashBoardTab() {
    openTab('dashboard');
  }

  function openAttendanceTab() {
    openTab('attendance');
  }

  function openStudentListTab() {
    openTab('students');
  }

  function openSubjectsTab() {
    openTab('subjects');
  }

  function openGradeBookTab() {
    openTab('grade_book');
  }

  function handleGradeBookUpdate(gradeData) {
    setStudentsList(gradeData);
    console.log(gradeData);
  }

  function handleStudentDetailsEdit(studentData) {
    const { id } = studentData;

    const [student] = studentsList.filter((st) => st.id === id);

    const updatedStudent = {
      ...student,
      ...studentData,
    };

    const updatedStudentsList = studentsList.filter((st) => st.id !== id);

    setStudentsList([...updatedStudentsList, updatedStudent]);
  }

  function handleStudentCreate(studentData) {
    const indexes = [];

    studentsList.forEach((s, index) => {
      indexes.push(index + 1);
    });

    const maxIndex = Math.max(...indexes);

    const id = maxIndex + 1;
    const { first_name, last_name, emailAddress, gender, date_of_birth } =
      studentData;

    const student = {
      id,
      first_name,
      last_name,
      parent_contact_info: emailAddress,
      gender,
      class_id: 1,
      current_grades: subjectList.map((subject) => {
        return {
          subject_id: subject.id,
          grade: 0,
        };
      }),
      date_of_birth,
    };
    const [classListData] = classList;

    const updatedClassList = [
      {
        ...classListData,
        students: [id, ...classListData.students],
      },
    ];
    console.log(updatedClassList);
    console.log(classList);

    setStudentsList([student, ...studentsList]);
    setClassList(updatedClassList);
    console.log(studentData);
    console.log(id);
  }

  function handleSubjectCreate(subjectData) {
    const indexes = [];

    subjectList.forEach((s, index) => {
      indexes.push(index + 1);
    });

    const maxIndex = Math.max(...indexes);

    const id = maxIndex + 1;
    const { name } = subjectData;

    const newSubjectData = {
      id,
      name,
      class_id: 1,
      teacher_id: 1,
    };

    const [classListData] = classList;

    const updatedClassList = [
      {
        ...classListData,
        subjects: [id, ...classListData.subjects],
      },
    ];

    console.log(newSubjectData);

    setSubjectList([...subjectList, newSubjectData]);
    setClassList(updatedClassList);
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
              {activeTab.dashboard && 'Dashboard'}
              {activeTab.students && 'Students List'}
              {activeTab.subjects && 'Subjects List'}
              {activeTab.attendance && 'Attendance'}
              {activeTab.grade_book && 'Grade Book'}
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
            <ListItemButton
              selected={activeTab.dashboard}
              onClick={openDashBoardTab}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton
              selected={activeTab.students}
              onClick={openStudentListTab}
            >
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary='Students' />
            </ListItemButton>
            <ListItemButton
              selected={activeTab.subjects}
              onClick={openSubjectsTab}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Subjects' />
            </ListItemButton>
            <ListItemButton
              selected={activeTab.grade_book}
              onClick={openGradeBookTab}
            >
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary='Grade Book' />
            </ListItemButton>
            <ListItemButton
              onClick={openAttendanceTab}
              selected={activeTab.attendance}
            >
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary='Attendance' />
            </ListItemButton>
          </List>
        </Drawer>
        {activeTab.dashboard && <Dashboard />}
        {activeTab.students && (
          <StudentsList
            student_list={studentsList}
            onStudentCreate={handleStudentCreate}
            class_list={classList}
            onStudentDetailsEdit={handleStudentDetailsEdit}
          />
        )}
        {activeTab.subjects && (
          <Subjects
            students_list={studentsList}
            class_list={classList}
            subject_data={subjectList}
            onSubjectCreate={handleSubjectCreate}
          />
        )}
        {activeTab.attendance && (
          <Attendance
            students_list={studentsList}
            attendance_data={attendanceList}
          />
        )}
        {activeTab.grade_book && (
          <GradeBook
            subjects_list={subjectList}
            class_list={classList}
            students_list={studentsList}
            onGradesUpdate={handleGradeBookUpdate}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
