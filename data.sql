CREATE DATABASE StudentMarkEntry;
CREATE TABLE Student (
    StudentId INT AUTO_INCREMENT PRIMARY KEY,
    StudentName VARCHAR(100),
    Age INT,
    City VARCHAR(50),
    ContactNo VARCHAR(15)
);
CREATE TABLE Subject (
    SubjectId INT AUTO_INCREMENT PRIMARY KEY,
    SubjectName VARCHAR(100)
);
CREATE TABLE ExamResult (
    ResultId INT AUTO_INCREMENT PRIMARY KEY,
    StudentId INT,
    SubjectId INT,
    Marks INT,
    FOREIGN KEY (StudentId) REFERENCES Student(StudentId),
    FOREIGN KEY (SubjectId) REFERENCES Subject(SubjectId)
);
INSERT INTO Student (StudentName, Age, City, ContactNo)
VALUES ('Jay', 20, 'Pune', '1234567890'),
    ('Ajay', 22, 'Mumbai', '0987654321'),
    ('Vijay', 25, 'Surat', '7463892843');
INSERT INTO Subject (SubjectName)
VALUES ('English'),
    ('Hindi'),
    ('Math'),
    ('Science');
INSERT INTO ExamResult (StudentId, SubjectId, Marks)
VALUES (1, 1, 34),
    (1, 2, 45),
    (2, 1, 55),
    (2, 2, 65);