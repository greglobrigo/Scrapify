import express from 'express';
import { Login, Logout } from './cronJob.js';
import Sprout from './sprout.js';


const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');
    new Sprout().initializeLogin();
    // Login.start();
    // Logout.start();
});