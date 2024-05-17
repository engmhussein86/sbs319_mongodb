import express from 'express';
import db from '../db/conn.js'
import { ObjectId } from 'mongodb';

const router = express.Router();

/**
 * {
 *  "title": "test title",
 *  "body": "body body body body body",
 *  "username": "testuser1"
 * } 
 */

// CRUD

/**
 * GET
 */

// router.get('/',(req,res)=>{
// res.send(`Hello from posts router`);
// });

/**
 * Create a new post
 * POST /posts/
 */
router.post('/',async (req,res)=>{
    try {
        const collection = await db.collection("posts");
        const new_document = req.body;

        const result = await collection.insertOne(new_document);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
})
/**
 * Get all posts
 * GET /posts/
 */
router.get('/',async (req,res)=>{
    try {
        const collection = await db.collection('posts');
        const query = {};
        const result = await collection.find(query).toArray();

        if (!result) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    });

/**
 * Get a single user by the id
 * GET /posts/:id
 */
router.get('/:id',async (req,res)=>{
    try {
        const collection = await db.collection('posts');
        const query = { _id: new ObjectId(req.params.id) };
        const result = await collection.findOne(query);

        if (!result) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    });

/**
 * Update an user by the id
 * PUT /posts/:id 
 * (try the PUT method this time)
*/
router.put('/:Id',async (req,res)=>{
    try {
        const collection = await db.collection("posts");
        const new_document = req.body;
        const query = { _id: new ObjectId(req.params.Id) };

        const result = await collection.updateOne(query, { $set: new_document });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})
/**
 * Delete an user by the id
 * DELETE /posts/:id
 */
router.delete('/:Id',async (req,res)=>{
    try {
        const collection = await db.collection("posts");
        const query = { _id: new ObjectId(req.params.Id) };

        const result = await collection.deleteOne(query);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})



export default router;