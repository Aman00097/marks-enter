const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [students] = await db.query('SELECT * FROM student');
        res.json(students);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching students');
    }
});


router.post('/', async (req, res) => {
    const { name, age, city, contact } = req.body.results;
    try {
        await db.query(
            'INSERT INTO Student (StudentName, Age, City, ContactNo) VALUES (?, ?, ?, ?)',
            [name, age, city, contact]
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving students');
    }
})

module.exports = router;