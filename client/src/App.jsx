import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from './assets/logo.png'

const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL;

export default function App() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const studentRes = await axios.get(`${API_BASE}/students`);
        const subjectRes = await axios.get(`${API_BASE}/subjects`);
        const marksRes = await axios.get(`${API_BASE}/exam-results`);

        setStudents(studentRes.data);
        setSubjects(subjectRes.data);
        setMarks(marksRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (studentId, subjectId, value) => {
    const newMarks = [...marks];
    const existingIndex = newMarks.findIndex(
      (mark) => mark.StudentId === studentId && mark.SubjectId === subjectId
    );

    if (existingIndex > -1) {
      // Update existing entry
      newMarks[existingIndex] = {
        ...newMarks[existingIndex],
        Marks: parseInt(value, 10),
      };
    } else {
      // Add new entry
      newMarks.push({
        StudentId: studentId,
        SubjectId: subjectId,
        Marks: parseInt(value, 10),
      });
    }

    setMarks(newMarks);
  };

  const handleSave = () => {
    axios
      .post(`${API_BASE}/exam-results`, { results: [...marks] })
      .then(() => alert("Marks saved successfully!"))
      .catch((err) => alert("Error saving marks: " + err.message));
  };

  const handleClear = () => {
    setMarks([]);
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <main style={{ padding: "20px" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',position:'relative',marginBottom:'30px' }}>
        <img src={logo} alt="log" style={{ width: '100px',position:'absolute',top:'-13px',left:'0' }} />
        <h1>StudentMarkEntry</h1>
      </div>
      <section>
        <table>
          <thead>
            <tr>
              <th>#</th>
              {subjects.map((subject) => (
                <th key={subject.SubjectId}>{subject.SubjectName}</th>
              ))}
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
                      value={
                        marks.find(
                          (mark) =>
                            mark.StudentId === student.StudentId &&
                            mark.SubjectId === subject.SubjectId
                        )?.Marks || ""
                      }
                      onChange={(e) =>
                        handleInputChange(
                          student.StudentId,
                          subject.SubjectId,
                          e.target.value
                        )
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "blue",
            color: "white",
            width: "80px",
            height: "30px",
            borderRadius: "7px",
            outline: "none",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          onClick={handleClear}
          style={{
            backgroundColor: "red",
            color: "white",
            width: "80px",
            height: "30px",
            borderRadius: "5px",
            outline: "none",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
    </main>
  );
}
