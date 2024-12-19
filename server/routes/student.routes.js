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

module.exports = router;