// Package Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Local Imports
const Database = require('../database');
const Router = require('../routes');
const logger = require('../middlewares/loggers.middleware');

// Constants
const { port } = require('../config/index');

class Server {
    static server = express();
    static init(){
        const { server } = Server;
        server.use(bodyParser.json());
        server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );

        const morganStream = {
            write: (message) => {
                // Use the logger to log the message (strip the newline character)
                logger.info(message.trim());
            },
        };

        // Use morgan for request logging (use the 'combined' format)
        server.use(morgan("combined", {
            stream: morganStream
        }));

        // use cors
        server.use(cors( {origin: "*"}));

        // parse request of content-type - application/json
        server.use(express.json());

        //Initiate the database
        Database.connects();

        //Routes
        const routes = Router.getRoutes(server);

        server.use('/', routes);

        const httpServer = server.listen(port, ()=>{
            console.log(`App is running on port ${port}.`);
        });
    }
}

module.exports = Server;