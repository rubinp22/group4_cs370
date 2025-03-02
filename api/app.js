import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import mongoose from 'mongoose'

import 'dotenv/config';


// Instantiate the API
const app = new Hono();

// Connect to mongo
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cs370-group-4.ymibp.mongodb.net/?retryWrites=true&w=majority&appName=CS370-Group-4`
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

serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
});