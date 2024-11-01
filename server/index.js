// Imports
import express from "express";
import { config } from "dotenv";
import user from "./routes/authentication.js";
import bodyparser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { DBConnect } from './db_config.js';

// Configuration
config(); // Load environment variables

// Database Connection
DBConnect(); // Connect to the MongoDB database

// Initialize Express App
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from your frontend
    credentials: true, // Allow cookies to be sent with requests
}));


app.use(bodyparser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyparser.json()); // Parse JSON bodies
app.use(cookieParser());

// Routes
app.use('/user/', user); // User authentication routes
app.get('/', (req, res) => {
    res.send("Hello"); // Home route
});

// Start the Server
app.listen(port, () => console.log(`App listening on port: ${port}`));
