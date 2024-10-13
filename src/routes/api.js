import express from 'express';
const router = express.Router();
router.use(express.json());

import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL);

router.get('/auth-test', (req, res) => {
    res.status(200).send(`Hello ${req.user.givenName}!`)
});

router.get('/db-test', async (req, res) => {
    try {
        const result = await sql`SELECT current_timestamp`;
        console.log(result)
        const currentTime = result[0].current_timestamp;
        res.send(`Database connection successful. Current timestamp: ${currentTime}`);
    } catch (err) {
        console.error(err);
        res.send('Error connecting to database');
    }
});

export default router;