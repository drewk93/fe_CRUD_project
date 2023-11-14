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
app.use(cors())
app.use(express.static('public'))

async function  routes(){

    // GET ROUTES

    app.get('/planes', async(req, res, next) => {
        try {
            const result = await pool.query('SELECT * FROM planes')
            res.status(200).json(result.rows)
        } catch(err){
            next(err)
        }
    });

    app.get('/planes/:id', async (req, res, next) => {
        const planeId = parseInt(req.params.id);
        if (isNaN(planeId) || planeId <= 0) {
            res.status(400).json({ message: 'Invalid plane ID' });
            return;
        }
        try {
        const result = await pool.query('SELECT * FROM planes WHERE id = $1', [planeId]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Plane not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
        } catch (err) {
        next(err);
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

    app.get('/manufacturers/:id', async (req, res, next) => {
        const manufacturerId = parseInt(req.params.id);
        if (isNaN(manufacturerId) || manufacturerId <= 0) {
            res.status(400).json({ message: 'Invalid manufacturer ID' });
            return;
        }
        try {
        const result = await pool.query('SELECT * FROM manufacturers WHERE id = $1', [manufacturerId]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Manufacturer not found' });
        } else {
            res.status(200).json(result.rows[0]);
        }
        } catch (err) {
        next(err);
        }
    });

    // POST ROUTES

    app.post('/planes', async (req, res, next) => {
        const newPlane = req.body;
        try {
            if (!newPlane.model || !newPlane.tail_number || !newPlane.manufacturer_id){
                res.status(400).json({error: 'Invalid Request'})
            } else {
            const result = await pool.query('INSERT INTO planes (model, tail_number, manufacturer_id) VALUES ($1, $2, $3) RETURNING *',
                [newPlane.model, newPlane.tail_number, newPlane.manufacturer_id]
            );
            newPlane.id = result.rows[0].id;
            res.status(201).json(result.rows[0]);
            }
        }catch (err) {
            next(err)
        }
    });

    app.post('/manufacturers', async (req, res, next) => {
        const newManufacturer = req.body;
        try {
            if (!newManufacturer.name || !newManufacturer.country) {
                res.status(400).json({ error: 'Invalid Request' });
            } else {
                const result = await pool.query(
                    'INSERT INTO manufacturers (name, country) VALUES ($1, $2) RETURNING *',
                    [newManufacturer.name, newManufacturer.country]
                );
                newManufacturer.id = result.rows[0].id;
                res.status(201).json(result.rows[0]);
            }
        } catch (err) {
            next(err);
        }
    });

    // PATCH ROUTES

    app.patch('/planes/:id', async (req, res, next) => {
        const id = parseInt(req.params.id);
        const updatedPlane = req.body;
        try {
            const result = await pool.query(
                'UPDATE planes SET model = $1, tail_number = $2, manufacturer_id = $3 WHERE id = $4 RETURNING *',
                [updatedPlane.model, updatedPlane.tail_number, updatedPlane.manufacturer_id, id]
            );

            // Check if any rows were updated
            if (result.rowCount === 0) {
                res.status(404).json({ message: 'Plane not found' });
            } else {
                const updatedRow = result.rows[0];
                res.json({ message: 'Plane updated successfully', updatedPlane: updatedRow });
            }
        } catch (error) {
            console.error('Error updating plane:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    app.patch('/manufacturers/:id', async (req, res, next) => {
        const id = parseInt(req.params.id);
        const updatedManufacturer = req.body;
        try {
        const result = await pool.query(
            'UPDATE manufacturers SET name = $1, country = $2 WHERE id = $3 RETURNING *',
            [updatedManufacturer.name, updatedManufacturer.country, id]
        );

        // Check if any rows were updated
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Manufacturer not found' });
        } else {
            const updatedRow = result.rows[0];
            res.json({ message: 'Manufacturer updated successfully', updatedManufacturer: updatedRow });
        }
        } catch (error) {
        console.error('Error updating manufacturer:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    });

    // DELETE ROUTES

    app.delete('/planes/:id', async (req, res, next) => {
        const planeId = parseInt(req.params.id);
        if (isNaN(planeId) || planeId <= 0) {
            res.status(400).json({ message: 'Invalid plane ID' });
            return;
        }
        try {
          const result = await pool.query('DELETE FROM planes WHERE id = $1 RETURNING *', [planeId]);
          if (result.rowCount === 0) {
            res.status(404).json({ message: 'Plane not found' });
          } else {
            res.json({ message: 'Plane deleted successfully', deletedPlane: result.rows[0] });
          }
        } catch (error) {
          console.error('Error deleting plane:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });

    app.delete('/manufacturers/:id', async (req, res, next) => {
        const manufacturerId = parseInt(req.params.id);
        if (isNaN(manufacturerId) || manufacturerId <= 0) {
            res.status(400).json({ message: 'Invalid manufacturer ID' });
            return;
        }
        try {
        const result = await pool.query('DELETE FROM manufacturers WHERE id = $1 RETURNING *', [manufacturerId]);
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Manufacturer not found' });
        } else {
            res.json({ message: 'Manufacturer deleted successfully', deletedManufacturer: result.rows[0] });
        }
        } catch (error) {
        console.error('Error deleting manufacturer:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
    });

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