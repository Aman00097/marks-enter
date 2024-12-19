const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Fetch students from the database
        const [students] = await db.query('SELECT * FROM student');

        console.log(students); // Log the retrieved data for debugging
        res.json(students); // Send the data as a JSON response
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send('Error fetching students');
    }
});

module.exports = router;