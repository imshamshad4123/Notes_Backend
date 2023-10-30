// const mongoose=require('mongoose')

// const mongoURI='mongodb+srv://imshamshad598:shamshad123@cluster0.pzovjal.mongodb.net/'

// const connectToMongo=()=>{
//     // mongoose.connect(mongoURI, {
//     //     useNewUrlParser: true,
//     //     useUnifiedTopology: true,
//     // });

//     // const db = mongoose.connection;

//     // db.on('error', (err) => {
//     //     console.error('MongoDB connection error:', err);
//     // });

//     // db.once('open', () => {
//     //     console.log('Connected to MongoDB successfully!');
//     // });
    
//     const connectionParams={
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     }
//     try{
//         // mongoose.connect('mongodb+srv://imshamshad:Going41ever@cluster0.hlza1dv.mongodb.net/inotebook?retryWrites=true&w=majority',
//         // connectionParams)
//         mongoose.connect(mongoURI,connectionParams)
//         console.log('databse connected')
//     }
//     catch(error){
//         console.log(error);
//         console.log('databse connection failed')
//     }
// }

// module.exports=connectToMongo;