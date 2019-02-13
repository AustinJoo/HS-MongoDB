# MongoDB Seeder Function
This repo contains the information for a populator function meant to establish a connection to and load a MongoDB with 10 million document entries for retrieval. Look below for steps on how to properly use the functions found within this repo.

## Setup
- **Dependencies**
  - Node for web
  - MongoDB for database
- **Setup steps**
 1) Create a service to run instance
     - Ubuntu 18.04 recommended 
 2) Allow traffic on ports 22 (SSH) and 27017 (Default Mongo Port)
 3) Create SSH connection  
 4) Install [Node](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04) and [Git](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-18-04)
 5) Install [MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04)
 6) Run command "git clone https://github.com/PeachiairBNB/HS-MongoDB.git"  
 7) Run command "sudo npm install"
 8) Run command "node mongoSeed.js" at the command line
 9) After message stating 10M+ data points have been entered, verify through MongoDB command line    
    - Run command mongod to start MongoDB Daemon on port 27017
    - Run command mongo to run commands directly from mongoDB command line and interact with established mongod instance
    - Run command "show dbs" to see list of databases
      - If database "helensMongoCarousel" exists, run command "use helensMongoCarousel" (You are on the right track)
    - Run command "show collections" to see list of collections
      - If collection "listings" exists, run command "db.listings.count()" and if a number greater than 10M logs, you are done!

## Notes
 - There is a mongoFinder.js file located in this repo. The server-database connection established within this file is an already existing database that has been deployed through AWS. If you would like to create a new Mongo database using this repo and connect to that it directly, you must change the uri within the mongoFinder function.
 - You can also run command "db.listings.findOne({_id: [enterID]})" at the mongoDB command line to find a particular document
