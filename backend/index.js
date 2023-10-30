// const connectToMongo=require('./db')

// connectToMongo();

// const connectTomongo=require('./db')
const express = require('express')
const app = express();
const mongoose=require('mongoose')
const cors=require('cors')
app.use(cors())

const corsOptions = {
  origin: 'https://thunderclient.io',
};
app.use(cors(corsOptions));

app.use(express.json())
//
const database=module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    // try{
    //     // mongoose.connect('mongodb+srv://imshamshad:Going41ever@cluster0.hlza1dv.mongodb.net/inotebook?retryWrites=true&w=majority',
    //     // connectionParams)
    //     mongoose.connect('mongodb+srv://imshamshad598:shamshad123@cluster0.pzovjal.mongodb.net/',
    //     connectionParams)
    //     console.log('databse connected')
    // }
    // catch(error){
    //     console.log(error);
    //     console.log('databse connection failed')
    // }
    const dbName = 'test'; // Replace 'inotebook' with your actual database name

    try {
        mongoose.connect(`mongodb+srv://imshamshad598:shamshad123@cluster0.pzovjal.mongodb.net/${dbName}`, connectionParams)
            .then(() => {
                console.log('Database connected');
            })
            .catch(error => {
                console.error('Error connecting to database:', error);
            });
    } catch (error) {
        console.error(error);
        console.log('Database connection failed');
    }
}
database();


const port = process.env.PORT||5000
app.use(express.json())
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Notebook app listening on port http://localhost:${port}`)
})


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZjg1M2Q3YWE5ODhiNGFkMzI0YzBkIn0sImlhdCI6MTY5ODY2MTY5M30.IrMBmH2jzSZOXhnY1CFa2pL0cWAq9ykgPsXQV25ilAM"



// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZjg1M2Q3YWE5ODhiNGFkMzI0YzBkIn0sImlhdCI6MTY5ODY2MTg3MH0.B17bD6tKwfP6ISyErQDY7m9UZZrGiZVH1voCjQKU644"
