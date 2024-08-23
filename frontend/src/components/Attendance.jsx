import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Box,
  Toolbar,
} from '@mui/material';
import dayjs from 'dayjs';

// Utility to generate missing dates
const generateDateRange = (startDate, endDate) => {
  let dates = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;
};

// Check if the date is a workday (Monday to Friday)
const isWorkday = (date) => {
  const day = dayjs(date).day();
  return day !== 0 && day !== 6; // Exclude Sundays(0) and Saturdays(6)
};

function Attendance({ students_list, attendance_data }) {
  const [students, setStudents] = useState(students_list);
  const [currentDates, setCurrentDates] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Generate the full list of workdays
  const allDates = generateDateRange(
    attendance_data[0].date,
    attendance_data[attendance_data.length - 1].date,
  ).filter(isWorkday);

  // Pagination: Display five workdays at a time
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allDates.length / itemsPerPage);

  useEffect(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentDates(allDates.slice(start, end));
  }, [currentPage]);

  // Update attendance data for each student
  const handleAttendanceChange = (studentId, date) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              attendance: {
                ...student.attendance,
                [date]: !student.attendance[date],
              },
            }
          : student,
      ),
    );
  };

  // Save updated attendance data
  const handleSaveAttendance = () => {
    console.log('Attendance saved:', students);
    alert('Attendance has been saved!');
  };

  // Check if student was present on a specific date
  const isStudentPresent = (student, date) =>
    student.attendance && student.attendance[date];

  return (
    <Box>
      <Toolbar />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {currentDates.map((date) => (
                <TableCell key={date} align='center'>
                  {date}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{`${student.last_name} ${student.first_name}`}</TableCell>
                {currentDates.map((date) => (
                  <TableCell key={date} align='center'>
                    <Checkbox
                      checked={isStudentPresent(student, date)}
                      onChange={() => handleAttendanceChange(student.id, date)}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSaveAttendance}
          >
            Save Attendance
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </Box>
      </TableContainer>
    </Box>
  );
}

export default Attendance;
