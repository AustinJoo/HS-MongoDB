const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://@52.14.101.160' 
|| 
'mongodb://localhost:27017/helensMongoCarousel';
const client = new MongoClient(uri);
const connection = client.connect();

let searchID;

let finder = (id, callback) => {
    // console.log(' this is the id: ', id)
    searchID = id;
    const connect = connection
    connect.then(() => {
        console.log('THE SEARCHID IS: ', searchID)
        db = client.db('helensMongoCarousel')
        db.collection('listings').findOne({_id: Number(searchID)})
        .then((data) => {
            // console.log('THIS IS THE DATA: ' , data);
            callback(data);
        })
    })
}


module.exports = finder; 

//sudo mongod --bind_ip 0.0.0.0