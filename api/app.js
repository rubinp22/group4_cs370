import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import mongoose from 'mongoose'
import 'dotenv/config';

// This schema represents all data recorded in an exercise
import Exercise from './models/Exercise.js'
// This schema represents user profile data
import Profile from './models/Profile.js'

// Instantiate the API
const app = new Hono();

const database = "test";

// Connect to mongo
// Here I've added the database variable to the URI. Without specifying this, Mongo defaults to the "test" database
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cs370-group-4.ymibp.mongodb.net/${database}?retryWrites=true&w=majority&appName=CS370-Group-4`
mongoose.connect(MONGO_URI, {
    // I removed useunifiedtopology and useNewUrlParser as they are deprecated options and were causing errors
})
.then(() => { console.log('Connected to MongoDB'); })
.catch(err => {console.error('Mongo connection error', err); });

// CORS middleware
// This is some piping we have to do to allow our client to be able to talk to our API without CORS issues.
// You can pretty much ignore this and have this sit at the top of your app.js, just know it is setting some
// headers (settings) to allow the client to talk to the api.
app.use('*', async (c, next) => {
    c.header('Access-Control-Allow-Origin', '*');
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (c.req.method === 'OPTIONS') return c.body(null, 204); // Handle preflight request
    return next();
});

// Our base home route
app.get('/', (c) => {
    return c.text('Hello Hono!')
})

// Here is the code telling the API (Hono) how to post an exercise to the database
// the argument "c" takes the object created in any of the input components that
// contains all text fields. 
app.post('exercises/', async (c) => {
    // Get the posted content
    const body = await c.req.json();

    // Create a new exercise with the posted content
    // In other words, this creates a new record in MongoDB
    Exercise.create(body);

    return c.text('Exercise Added');
})

// Here is the code telling the API how to query for a specfic set of exercises.
// The set of exercises is determined by the params specified by the get calls 
// in all view components.
app.get('/exercises', async (c) => {
    const params = c.req.query();

    const Exercises = await Exercise.find(params);
    return c.json(Exercises);
})

app.post('users/', async (c) => {
    // Get the posted content
    const body = await c.req.json();

    // Create a new profile with the posted content
    // In other words, this creates a new record in MongoDB
    Profile.create(body);

    return c.text('Profile Added');
})

app.get('/users', async (c) => {
    const params = c.req.query();

    const Profiles = await Profile.find(params);
    return c.json(Profiles);
})

app.put('users/', async (c) => {
    // get the updated info
    const body = await c.req.json();

    // debug logging to check what is being updated
    console.log('Profile Changes:', body);

    await Profile.updateOne(
        {_id: body._id},
        { $set: body}
    );
    
    return c.text('Profile Updated');
})

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
});