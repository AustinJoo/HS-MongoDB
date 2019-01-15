const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb://localhost:27017/helensMongoCarousel';
const client = new MongoClient(uri);
const connection = client.connect();

let searchID;

let finder = (id, callback) => {
    // console.log(' this is the id: ', id)
    searchID = id;
    const connect = connection
    connect.then(() => {
        db = client.db('helensMongoCarousel')
        // console.log('THE SEARCHID IS: ', searchID)
        db.collection('listings').findOne({_id: Number(searchID)})
        .then((data) => {
            // console.log('THIS IS THE DATA: ' , data);
            callback(data);
        })
    })
}


module.exports = finder; 