import express from 'express';
import { Login, Logout } from './cronJob.js';

const app = express();

app.listen(3000, () => {
    console.log('Server running on port 3000');
    Login.start();
    Logout.start();
});