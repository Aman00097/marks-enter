import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from './assets/logo.png'

const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL;

export default function App() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    city: "",
    contact: "",
  });
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

  const handleAddStudent = (e) => {
    e.preventDefault()
    axios
      .post(`${API_BASE}/students`, { results: newStudent })
      .then(() => {
        setOpenForm(false)
        alert("Student added successfully!")
      })
      .catch((err) => alert("Error saving marks: " + err.message));
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
    <>
      <main style={{ padding: "20px" }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '30px' }}>
          <img src={logo} alt="log" style={{ width: '100px', position: 'absolute', top: '-13px', left: '0' }} />
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
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => setOpenForm(true)}
            style={{
              backgroundColor: "green",
              color: "white",
              width: "80px",
              height: "30px",
              borderRadius: "7px",
              outline: "none",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            Add
          </button>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}>
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
        </div>
      </main>


      {openForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "300px",
            }}
          >
            <h2 style={{ marginBottom: "10px" }}>Add New Student</h2>
            <div style={{ marginBottom: "10px" }}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Age:</label>
              <input
                type="text"
                name="age"
                value={newStudent.age}
                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}

                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={newStudent.city}
                onChange={(e) => setNewStudent({ ...newStudent, city: e.target.value })}

                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Contact No:</label>
              <input
                type="text"
                name="contact"
                value={newStudent.contact}
                onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}

                style={{ width: "100%", padding: "5px", marginTop: "5px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleAddStudent}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setOpenForm(false)
                  setNewStudent({
                    name: "",
                    age: "",
                    city: "",
                    contact: "",
                  })
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
