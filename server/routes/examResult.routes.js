const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query(`SELECT * FROM examresult`);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching exam result');
    }
});

router.post('/', async (req, res) => {
    console.log(req);
    
    const results = req.body.results;

    try {
        for (const result of results) {
            const { StudentId, SubjectId, Marks } = result;

            const [existingResult] = await db.query(
                'SELECT * FROM ExamResult WHERE StudentId = ? AND SubjectId = ?',
                [StudentId, SubjectId]
            );

            if (existingResult.length > 0) {
                await db.query(
                    'UPDATE ExamResult SET Marks = ? WHERE StudentId = ? AND SubjectId = ?',
                    [Marks, StudentId, SubjectId]
                );
            } else {
                await db.query(
                    'INSERT INTO ExamResult (StudentId, SubjectId, Marks) VALUES (?, ?, ?)',
                    [StudentId, SubjectId, Marks]
                );
            }
        }

        res.status(200).send('Marks saved successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving marks');
    }
});

module.exports = router;
