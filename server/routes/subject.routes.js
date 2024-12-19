const express = require('express');
const db = require('../db/db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [subjects] = await db.query('SELECT * FROM Subject');
        res.json(subjects);
    } catch (err) {
        res.status(500).send('Error fetching subjects');
    }
});

module.exports = router;
