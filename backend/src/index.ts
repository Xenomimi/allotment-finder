import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import router from './routes/locationRouter';

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
}));

app.use('/api', router);

app.listen(PORT, ()=>{
    console.log("backend is running on port http://localhost:5000");
})

const connectDb = async() => {
    try{
        await mongoose.connect('__TUTAJ_LINK_DO_BAZY_MONGODB__');
        console.log("db connected successfuly! ");
    } catch (error) {
        console.error("something went wrong with db connection ");
    }
}

connectDb();



