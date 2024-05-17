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
// res.send(`Hello from comments router`);
// });

/**
 * Create a new post
 * POST /comments/
 */
router.post('/',async (req,res)=>{
    console.log(req.body);
    const collection = await db.collection("comments");
    const new_document = req.body;

    const result = await collection.insertOne(new_document);
    res.send(result).status(201);
    
})
/**
 * Get all comments
 * GET /comments/
 */
router.get('/',async (req,res)=>{
    console.log(req.params);
    const collection = await db.collection('comments');
    const query = {};
    const result = await collection.find(query).toArray();

    if(! result) res.send('not found').status(404);
    else res.send(result).status(200);
    });

/**
 * Get a single user by the id
 * GET /comments/:id
 */
router.get('/:id',async (req,res)=>{
    console.log(req.params);
    const collection = await db.collection('comments');
    const query = {_id: new ObjectId(req.params.id)};
    const result = await collection.findOne(query);

    if(! result) res.send('not found').status(404);
    else res.send(result).status(200);
    });

/**
 * Update an user by the id
 * PUT /comments/:id 
 * (try the PUT method this time)
*/
router.put('/:Id',async (req,res)=>{
    console.log(req.body);
    const collection = await db.collection("comments");
    const new_document = req.body;
    const query = {_id:new ObjectId(req.params.Id)};
            
    const result = await collection.updateOne(query,{$set:new_document});
    res.send(result).status(200);

})
/**
 * Delete an user by the id
 * DELETE /comments/:id
 */
router.delete('/:Id',async (req,res)=>{
    console.log(req.body);
    const collection = await db.collection("comments");
    const query = {_id:new ObjectId(req.params.Id)};
            
    const result = await collection.deleteOne(query);
    res.send(result).status(200);

})

/**
 * Sign in a user
 * POST /comments/signin
 */
router.post('/signin', async(req, res) => {
    // check if user exist
    // check if passwords are a match
    // req.body.password === user.password

    
    const collection = await db.collection('comments');
    const user = await collection.findOne({username:req.body.username});

    if(! user) 
    {
        res.send('not found').status(404);
    }

    else if(user.password !== req.body.password){
        res.send(`wrong password`);
    }
    else res.send(user).status(200);

})


export default router;