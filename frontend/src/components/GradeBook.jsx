import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Toolbar,
  Typography,
} from '@mui/material';

function GradeBook({
  students_list,
  class_list,
  subjects_list,
  onGradesUpdate,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [students, setStudents] = useState(students_list);

  const handleGradeChange = (studentId, subjectId, grade) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              current_grades: student.current_grades.map((g) => {
                if (g.subject_id === subjectId) {
                  return { ...g, grade: parseInt(grade, 10) || 0 };
                } else {
                  return g;
                }
              }),
            }
          : student,
      ),
    );
  };

  const getStudentGrade = (student, subject) => {
    const gradeObj = student.current_grades.find(
      (g) => g.subject_id === subject.id,
    );
    return gradeObj ? gradeObj.grade : '';
  };

  const handleSaveGrades = () => {
    // Typically you would send the updated grade data to a backend server.
    console.log('Grades saved:', students);
    alert('Grades have been saved!');
    setIsEdit(false);
    onGradesUpdate(students);
  };

  return (
    <Box>
      <Toolbar />
      {!isEdit && (
        <Box>
          <Button
            variant='contained'
            color='primary'
            type='button'
            onClick={() => setIsEdit(true)}
          >
            Edit GradeBook
          </Button>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '100px' }}>Name</TableCell>
              {subjects_list.map((subject) => (
                <TableCell
                  key={subject.id}
                  align='center'
                  sx={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                  }}
                >
                  {subject.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{`${student.last_name} ${student.first_name}`}</TableCell>
                {subjects_list.map((subject) => (
                  <TableCell key={subject.id} align='center'>
                    {isEdit ? (
                      <TextField
                        value={getStudentGrade(student, subject)}
                        onChange={(e) =>
                          handleGradeChange(
                            student.id,
                            subject.id,
                            e.target.value,
                          )
                        }
                        type='number'
                        inputProps={{ min: 0, max: 100 }}
                        variant='outlined'
                        size='small'
                      />
                    ) : (
                      <Typography>
                        {getStudentGrade(student, subject)}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isEdit && (
          <Button
            variant='contained'
            color='primary'
            onClick={handleSaveGrades}
            sx={{ mt: 2 }}
          >
            Save Grades
          </Button>
        )}
      </TableContainer>
    </Box>
  );
}

export default GradeBook;
