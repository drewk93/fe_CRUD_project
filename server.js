'use strict'
import express from 'express'
const app = express();
app.use(express.json());
const PORT = 3000;

import pg from 'pg'
const { Pool } = pg;

const pool = new Pool ({
    user: "postgres",
    host: "localhost",
    database: "fe_crud_project",
    password: "password",
    port: "5432"
})

import cors from 'cors'
app.use(cors({
    origin: 'http://127.0.0.1.5500'
}))
app.use(express.static('public'))

async function  routes(){

app.get('/planes', async(req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM planes')
        res.status(200).json(result.rows)
    } catch(err){
        next(err)
    }
});

app.get('/manufacturers', async(req,res,next) => {
    try {
        const result = await pool.query('SELECT * FROM manufacturers')
        res.status(200).json(result.rows)
    } catch(err){
        next(err)
    }
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.type("text/plain");
    res.status(err.status || 500);
    res.send(err.message)
})

app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`)
})

}

routes()