const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://manikandan05082003:Manicdon07%40@cluster0.scriurb.mongodb.net/internships', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define schema and model for Job posts
const jobSchema = new mongoose.Schema({
    name: String,
    description: String,
    package: String,
    requirements: String,
    skillNeeded: String,
    responsibility: String,
    category: String,
    jobType: String,
    datePosted: { type: Date, default: Date.now },
    experience: String,
    location: String,
});

const Job = mongoose.model('Job', jobSchema);

// Routes
app.post('/api/postData', async (req, res) => {
    try {
        const {
            name,
            description,
            package,
            requirements,
            skillNeeded,
            responsibility,
            category,
            jobType,
            experience,
            location,
        } = req.body;

        const newJob = new Job({
            name,
            description,
            package,
            requirements,
            skillNeeded,
            responsibility,
            category,
            jobType,
            experience,
            location,
        });

        await newJob.save();
        res.status(201).json({ message: 'Job post created successfully' });
    } catch (error) {
        console.error('Error creating job post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch posts based on category (type)
app.get('/api/posts/', async (req, res) => {
    try {
        const posts = await Job.find(); // Fetch posts based on category (type)
        res.json(posts);
    } catch (error) {
        console.error('Error fetching job posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
