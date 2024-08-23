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
  Typography,
  TextField,
  ButtonGroup,
  Modal,
  Toolbar,
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';
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

export default function Subjects({
  subject_data,
  students_list,
  class_list,
  onSubjectCreate,
}) {
  const [createSubjectModal, setCreateSubjectModal] = useState(false);
  const rows = subject_data.map((subject) => {
    const { name, class_id, id } = subject;
    const [classTakingSubject] = class_list.filter((c) => c.id === class_id);
    const studentsCount = classTakingSubject.students.length;

    return {
      name,
      studentsCount,
      id,
    };
  });

  function openAddSubjectModal() {
    setCreateSubjectModal(true);
  }

  function handleSubjectCreate(e) {
    e.preventDefault();

    const { elements } = e.target;

    const subjectData = {
      name: elements.subject_name.value,
    };

    onSubjectCreate(subjectData);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
          <Box my={4} display='flex' gap={4} p={2}>
            <Button variant='contained' onClick={openAddSubjectModal}>
              Add new Subject
            </Button>
          </Box>
          <Container sx={{ mt: 4, mb: 4 }}>
            <TableContainer component={Paper} style={{ width: '100%' }}>
              <Table sx={{ minWidth: 300 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Subject Name</StyledTableCell>
                    <StyledTableCell>Students Taking Subject</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.id} style={{ cursor: 'pointer' }}>
                      <StyledTableCell component='th' scope='row'>
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell>{row.studentsCount}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </Box>

      <Modal
        open={createSubjectModal}
        onClose={() => {
          setCreateSubjectModal(false);
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          component='form'
          sx={modalStyle}
          onSubmit={(e) => {
            handleSubjectCreate(e);
            setCreateSubjectModal(false);
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='h5'
            sx={{ mb: 2 }}
            component='h2'
          >
            Create New Subject
          </Typography>
          <TextField
            required
            id='outlined-basic'
            label='Subject Name'
            variant='outlined'
            name='subject_name'
          />

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
                setCreateSubjectModal(false);
              }}
            >
              Cancel
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Create Subject
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
