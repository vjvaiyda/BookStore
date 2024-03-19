import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middle ware to parsing requrest body
app.use(express.json());

//Middle ware to handle CORS policy
// Option 1 : Allow all origin with default of cors(*)
app.use(cors());
// Option 2 : Allow custom origin 
/*
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/


app.get('/', (request, response) =>
{
    console.log(request)
    return response.status(234).send('Welcome to MERN statc turorial')
});

app.use('/books', booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(() =>
    {
        console.log(`App connected to database`);
        app.listen(PORT, () =>
        {
            console.log(`App is listening to poert: ${PORT}`)
        });
    })
    .catch((error) =>
    {
        console.log(error);
    });