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
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import TextField from '@mui/material/TextField';
import { useState } from 'react';

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

const defaultTheme = createTheme();

export default function StudentsList({
  student_list,
  onStudentCreate,
  class_list,
}) {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [createStudentModalOpen, setCreateStudentModalOpen] = useState(false);

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

    console.log(studentClass?.name);

    const classNameVal = studentClass?.name ? studentClass.name : 'class';

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
                          <StyledTableCell align='right'>Class</StyledTableCell>
                          <StyledTableCell align='right'>
                            gender
                          </StyledTableCell>
                          <StyledTableCell align='right'>
                            emailAddress&nbsp;(g)
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow
                            key={row.id}
                            onClick={() => setSelectedStudentId(row.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            <StyledTableCell component='th' scope='row'>
                              {row.fullName}
                            </StyledTableCell>
                            <StyledTableCell component='th' scope='row'>
                              {row.classNameVal}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.gender}
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              {row.emailAddress}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
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
                    {selectedStudent.emailAddress}
                  </p>
                  {/* Add more details as necessary */}
                  <Button variant='contained' onClick={handleBackClick}>
                    Back to List
                  </Button>
                </Paper>
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
            Text in a modal
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

          <Button type='submit' variant='contained' color='primary'>
            Create Student
          </Button>
        </Box>
      </Modal>
    </>
  );
}
