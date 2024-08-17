const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
// middleware
app.use(express.json())
app.use(cors());

// mongdb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aymctjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // database
    const database = client.db("watchwave");
    // collection
    const productsCollection = database.collection('productsCollection')

    app.get("/allproducts",async(req,res)=>{
        const result = await productsCollection.find().toArray()
        res.send(result)
    })
    app.get("/allproducts",async(req,res)=>{
        const result = await productsCollection.find().toArray()
        res.send(result)
    })
    app.get("/allproducts",async(req,res)=>{
        const result = await productsCollection.find().toArray()
        res.send(result)
    })

   
// search products

app.get("/seracproducts",async(req,res)=>{
  const name = req.query.name;  
  let query={
    productName:{$regex:name,$options:'i'},
  }
  const result= await productsCollection.find(query).toArray();

  res.send(result)
})


// date 1





 
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

  }
}
run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send({message:"helo from WatchWave server"})
    })

app.listen(PORT,()=>{
    console.log(`WatchWave server is running on ${PORT}`);
})