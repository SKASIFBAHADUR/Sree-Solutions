import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnect from './server/lib/mongodb.js';
import Job from './server/models/Job.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/jobs', async (req, res) => {
    try {
        console.log('GET /api/jobs: Connecting to DB...');
        await dbConnect();
        console.log('GET /api/jobs: Fetching jobs...');
        const jobs = await Job.find().sort({ createdAt: -1 });
        console.log(`GET /api/jobs: Success, found ${jobs.length} jobs`);
        res.json(jobs);
    } catch (error) {
        console.error('GET /api/jobs ERROR:', error);
        res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
    }
});

app.post('/api/jobs', async (req, res) => {
    try {
        console.log('POST /api/jobs: Connecting to DB...');
        await dbConnect();
        console.log('POST /api/jobs: Creating job with data:', req.body);
        const job = await Job.create(req.body);
        console.log('POST /api/jobs: Success, created job ID:', job._id);
        res.status(201).json(job);
    } catch (error) {
        console.error('POST /api/jobs ERROR:', error);
        res.status(500).json({ error: 'Failed to create job', details: error.message });
    }
});
app.delete('/api/jobs/:id', async (req, res) => {
    try {
        console.log(`DELETE /api/jobs/${req.params.id}: Connecting to DB...`);
        await dbConnect();
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            console.log(`DELETE /api/jobs/${req.params.id}: Job not found`);
            return res.status(404).json({ error: 'Job not found' });
        }
        console.log(`DELETE /api/jobs/${req.params.id}: Success, deleted job ID:`, deletedJob._id);
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error(`DELETE /api/jobs/${req.params.id} ERROR:`, error);
        res.status(500).json({ error: 'Failed to delete job', details: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
