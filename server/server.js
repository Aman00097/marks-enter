const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const studentRoutes = require('./routes/student.routes');
const subjectRoutes = require('./routes/subject.routes');
const examResultRoutes = require('./routes/examResult.routes');
const db = require('./db/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/students', studentRoutes);
app.use('/subjects', subjectRoutes);
app.use('/exam-results', examResultRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
