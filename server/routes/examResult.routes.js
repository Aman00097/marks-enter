const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM examresult');
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching exam result');
    }
});

router.post('/', async (req, res) => {
    const { results } = req.body;

    const query = `INSERT INTO ExamResult (StudentId, SubjectId, Marks) VALUES ?`;

    const values = results.map(({ StudentId, SubjectId, Marks }) => [StudentId, SubjectId, Marks]);

    try {
        await db.query(query, [values]);
        res.status(201).send('Results saved successfully');
    } catch (err) {
        res.status(500).send('Error saving results');
    }
});

module.exports = router;
