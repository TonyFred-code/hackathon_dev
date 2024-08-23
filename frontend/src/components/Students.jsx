import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Modal,
  Toolbar,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  ButtonGroup,
  Tabs,
  Tab,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { ThemeProvider } from '@emotion/react';

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const defaultTheme = createTheme();

export default function StudentsList({
  student_list,
  onStudentCreate,
  class_list,
}) {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [createStudentModalOpen, setCreateStudentModalOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [editStudent, setEditStudent] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function selectedStudentData() {
    return student_list.filter((student) => {
      return student.id === selectedStudentId;
    });
  }

  function openAddStudentModal() {
    setCreateStudentModalOpen(true);
  }

  function handleBackClick() {
    setSelectedStudentId(null);
  }

  function handleCreateStudent(e) {
    const { elements } = e.target;

    console.log(elements);
    const studentData = {
      first_name: elements.first_name.value,
      last_name: elements.last_name.value,
      emailAddress: elements.emailAddress.value,
      gender: elements.gender.value,
      date_of_birth: elements.date_of_birth.value,
    };

    onStudentCreate(studentData);
  }

  let selectedStudent;

  if (selectedStudentId !== null) {
    [selectedStudent] = selectedStudentData();
    console.log(selectedStudent);
  }

  const rows = student_list.map((student) => {
    const { first_name, last_name, gender, id, parent_contact_info } = student;
    const emailAddress = parent_contact_info;

    const [studentClass] = class_list.filter((classD) => {
      return classD.students.includes(id);
    });

    let classNameVal = '-';

    if (studentClass) {
      classNameVal = studentClass.name;
    }

    const fullName = `${last_name} ${first_name}`;
    return {
      fullName,
      gender,
      emailAddress,
      id,
      classNameVal,
    };
  });

  console.log(class_list);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <CssBaseline />
          <Box
            component='main'
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container sx={{ mt: 4, mb: 4 }}>
              {selectedStudentId === null ? (
                <Box>
                  <Box my={4} display='flex' gap={4} p={2}>
                    <Button variant='contained' onClick={openAddStudentModal}>
                      Add new Student
                    </Button>
                  </Box>
                  <TableContainer component={Paper} style={{ width: '100%' }}>
                    <Table sx={{ minWidth: 300 }} aria-label='customized table'>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Class</StyledTableCell>
                          <StyledTableCell>Gender</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow
                            key={row.id}
                            onClick={() => setSelectedStudentId(row.id)}
                            style={{
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                            }}
                          >
                            <StyledTableCell component='th' scope='row'>
                              {row.fullName}
                            </StyledTableCell>
                            <StyledTableCell component='th' scope='row'>
                              {row.classNameVal}
                            </StyledTableCell>
                            <StyledTableCell>{row.gender}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box>
                    <Button variant='contained' onClick={handleBackClick}>
                      Back to List
                    </Button>
                    <Button
                      variant='contained'
                      onClick={() => {
                        setEditStudent(true);
                      }}
                    >
                      Edit Student
                    </Button>
                  </Box>
                  <Paper style={{ padding: 16 }}>
                    <h2>
                      {selectedStudent.first_name} {selectedStudent.last_name}
                      &apos;s Details
                    </h2>
                    <p>
                      <strong>Gender:</strong> {selectedStudent.gender}
                    </p>
                    <p>
                      <strong>Email Address:</strong>
                      {selectedStudent.parent_contact_info}
                    </p>
                    {/* Add more details as necessary */}
                  </Paper>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                      >
                        <Tab label='Student Bio' {...a11yProps(0)} />
                        <Tab label='Item Two' {...a11yProps(1)} />
                        <Tab label='Item Three' {...a11yProps(2)} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <Paper sx={{ p: 1 }}>
                        <Typography
                          variant='h6'
                          sx={{
                            mb: 1,
                          }}
                        >
                          Student Profile
                        </Typography>

                        <Box>
                          <Box
                            sx={{
                              display: 'flex',
                              borderBottom: 2,
                              borderColor: 'divider',
                              p: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                              }}
                            >
                              First Name
                            </Typography>
                            <Typography>
                              {selectedStudent.first_name}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              borderBottom: 2,
                              borderColor: 'divider',
                              p: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                              }}
                            >
                              Last Name
                            </Typography>
                            <Typography>{selectedStudent.last_name}</Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              borderBottom: 2,
                              borderColor: 'divider',
                              p: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                              }}
                            >
                              Email Address
                            </Typography>
                            <Typography>
                              {selectedStudent.parent_contact_info}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              borderBottom: 2,
                              borderColor: 'divider',
                              p: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                              }}
                            >
                              Date of Birth:
                            </Typography>
                            <Typography>
                              {selectedStudent.date_of_birth}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                      Item Three
                    </CustomTabPanel>
                  </Box>
                </Box>
              )}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
      <Modal
        open={createStudentModalOpen}
        onClose={() => {
          setCreateStudentModalOpen(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          component='form'
          sx={modalStyle}
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateStudent(e);
            setCreateStudentModalOpen(false);
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='h5'
            sx={{ mb: 2 }}
            component='h2'
          >
            Create Student
          </Typography>
          <TextField
            required
            id='outlined-basic'
            label='Student First Name'
            variant='outlined'
            name='first_name'
          />

          <TextField
            required
            id='outlined-basic'
            label='Student Last Name'
            variant='outlined'
            name='last_name'
          />

          <TextField
            required
            id='outlined-basic'
            label='Email Address'
            variant='outlined'
            name='emailAddress'
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker name='date_of_birth' label='Date of Birth' />
            </DemoContainer>
          </LocalizationProvider>

          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='gender'
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </FormControl>

          <ButtonGroup
            sx={{
              gap: 3,
              justifyContent: 'space-around',
            }}
          >
            <Button
              type='button'
              variant='contained'
              color='error'
              onClick={() => {
                setCreateStudentModalOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Create Student
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
      {editStudent && (
        <Modal
          open={editStudent}
          onClose={() => {
            setEditStudent(false);
          }}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box
            component='form'
            sx={modalStyle}
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateStudent(e);
            }}
          >
            <Typography
              id='modal-modal-title'
              variant='h5'
              sx={{ mb: 2 }}
              component='h2'
            >
              Edit Student
            </Typography>
            <TextField
              required
              id='outlined-basic'
              label='Student First Name'
              variant='outlined'
              name='first_name'
              defaultValue={selectedStudent && selectedStudent.first_name}
            />

            <TextField
              required
              id='outlined-basic'
              label='Student Last Name'
              variant='outlined'
              name='last_name'
              defaultValue={selectedStudent && selectedStudent.last_name}
            />

            <TextField
              required
              id='outlined-basic'
              label='Email Address'
              variant='outlined'
              name='emailAddress'
              defaultValue={
                selectedStudent && selectedStudent.parent_contact_info
              }
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  name='date_of_birth'
                  label='Date of Birth'
                  defaultValue={
                    selectedStudent && dayjs(selectedStudent.date_of_birth)
                  }
                />
              </DemoContainer>
            </LocalizationProvider>

            <FormControl>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue={selectedStudent && selectedStudent.gender}
                name='gender'
              >
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Male'
                />
              </RadioGroup>
            </FormControl>

            <ButtonGroup
              sx={{
                gap: 3,
                justifyContent: 'space-around',
              }}
            >
              <Button
                type='button'
                variant='contained'
                color='error'
                onClick={() => {
                  setEditStudent(false);
                }}
              >
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Create Student
              </Button>
            </ButtonGroup>
          </Box>
        </Modal>
      )}
    </>
  );
}
