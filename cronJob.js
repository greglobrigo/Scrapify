import cron from 'node-cron';
import Sprout from './sprout.js';

//Run Every 7:30 AM Monday to Friday
export const Login = cron.schedule('30 8 * * 1-5', () => {
    new Sprout().initializeLogin();
},{
    scheduled: true,
    timezone: "Asia/Manila"
});

//Run Every 6:30 PM Monday to Friday
export const Logout = cron.schedule('0 18 * * 1-5', () => {
    new Sprout().initializeLogout();
},{
    scheduled: true,
    timezone: "Asia/Manila"
});




