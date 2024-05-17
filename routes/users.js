import express from 'express';
import db from '../db/conn.js'
import { ObjectId } from 'mongodb';

const router = express.Router();

/**
 * {
 *  "email": "test@test.com",
 *  "password": "password123",
 *  "username": "testuser1"
 * } 
 */

// CRUD

/**
 * GET
 */

// router.get('/',(req,res)=>{
// res.send(`Hello from users router`);
// });

/**
 * Create a new user
 * POST /users/
 */
router.post('/',async (req,res)=>{
    console.log(req.body);
    const collection = await db.collection("users");
    const new_document = req.body;

    const user = await collection.findOne({$or : [{username:req.body.username}, {email:req.body.email}]});

    

    if(user) 
    {
        res.send('user found .. try another email or username').status(302); // found
    }
    else{
    const result = await collection.insertOne(new_document);
    res.send(result).status(201);
    }

})
/**
 * Get all users
 * GET /users/
 */
router.get('/',async (req,res)=>{
    console.log(req.params);
    const collection = await db.collection('users');
    const query = {};
    const result = await collection.find(query).toArray();

    if(! result) res.send('not found').status(404);
    else res.send(result).status(200);
    });

/**
 * Get a single user by the id
 * GET /users/:id
 */
router.get('/:id',async (req,res)=>{
    console.log(req.params);
    const collection = await db.collection('users');
    const query = {_id: new ObjectId(req.params.id)};
    const result = await collection.findOne(query);

    if(! result) res.send('not found').status(404);
    else res.send(result).status(200);
    });

/**
 * Update an user by the id
 * PUT /users/:id 
 * (try the PUT method this time)
*/
router.put('/:Id',async (req,res)=>{
    console.log(req.body);
    const collection = await db.collection("users");
    const new_document = req.body;
    const query = {_id:new ObjectId(req.params.Id)};
            
    const result = await collection.updateOne(query,{$set:new_document});
    res.send(result).status(200);

})
/**
 * Delete an user by the id
 * DELETE /users/:id
 */
router.delete('/:Id',async (req,res)=>{
    console.log(req.body);
    const collection = await db.collection("users");
    const query = {_id:new ObjectId(req.params.Id)};
            
    const result = await collection.deleteOne(query);
    res.send(result).status(200);

})

/**
 * Sign in a user
 * POST /users/signin
 */
router.post('/signin', async(req, res) => {
    // check if user exist
    // check if passwords are a match
    // req.body.password === user.password

    
    try {
        const collection = await db.collection('posts');
        const user = await collection.findOne({ username: req.body.username });

        if (!user) {
            res.status(404).send('Not Found');
        } else if (user.password !== req.body.password) {
            res.status(401).send('Wrong Password');
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


export default router;