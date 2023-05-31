import * as dotenv from 'dotenv'
import { app } from './index.js';
import { connect_db } from './database.js';


dotenv.config();

const PORT = process.env.PORT||5000;

connect_db();
app.listen(PORT, () => console.log("Successfully connected to server"))