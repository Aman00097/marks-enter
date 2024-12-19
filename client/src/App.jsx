import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL;

export default function App() {
  const [students, setStudents] = useState();
  const [subjects, setSubjects] = useState();
  const [marks, setMarks] = useState();

  useEffect(() => {
    try {
      axios.get(`${API_BASE}/students`).then((res) => setStudents(res.data))
      axios.get(`${API_BASE}/subjects`).then((res) => setSubjects(res.data));
      axios.get(`${API_BASE}/exam-results`).then((res) => setMarks(res.data));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleInputChange = (studentId, subjectId, value) => {

    // console.log(marks);
    // let data = marks.map(ele => {
    //   if (ele.StudentId === studentId && ele.SubjectId === subjectId) {
    //     return { ...ele, Marks: value }
    //   } else {
    //     return { ...ele }
    //   }
    // })
    // setMarks(data)

    setMarks({
      ...prev,
      [`${studentId}-${subjectId}`]: value,
    })


  };

  const handleSave = () => {
    const results = [];
    for (const key in marks) {
      const [studentId, subjectId] = key.split("-");
      results.push({
        StudentId: parseInt(studentId),
        SubjectId: parseInt(subjectId),
        Marks: parseInt(marks[key]),
      });
    }

    axios
      .post("http://localhost:4000/exam-results", { results })
      .then(() => alert("Marks saved successfully!"))
      .catch((err) => alert("Error saving marks: " + err.message));
  };

  const handleClear = () => {
    setMarks();
  };

  console.log(marks);
  if (!students || !subjects || !marks) return
  return (
    <main style={{ padding: '20px' }}>
      <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {subjects && subjects.map(subject => <th key={subject.SubjectId}>{subject.SubjectName}</th>)}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.StudentId}>
                <td>{student.StudentName}</td>
                {subjects.map((subject) => (
                  <td key={subject.SubjectId}>
                    <input
                      type="number"
                      // value={marks[`${student.StudentId}-${subject.SubjectId}`] || ""}
                      value={() => {
                        marks.find(mark => mark.StudentId === student.StudentId && mark.SubjectId === subject.SubjectId).Marks
                      }}
                      onChange={(e) =>
                        handleInputChange(
                          student.StudentId,
                          subject.SubjectId,
                          e.target.value
                        )
                      }
                      placeholder="Enter Marks"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '10px', marginTop: '10px' }}>
        <button onClick={handleSave} style={{ backgroundColor: 'blue', color: 'white', width: '80px', height: '30px', borderRadius: '7px', outline: 'none', border: '1px solid #ccc', cursor: 'pointer' }}>
          Save
        </button>
        <button onClick={handleClear} style={{ backgroundColor: 'red', color: 'white', width: '80px', height: '30px', borderRadius: '5px', outline: 'none', border: '1px solid #ccc', cursor: 'pointer' }}>
          Clear
        </button>
      </div>
    </main>

  )
}
