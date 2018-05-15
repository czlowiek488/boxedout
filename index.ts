//import node js && npm packages
import * as path from 'path';
import * as express from 'express';
import * as serveIndex from 'serve-index';
import { createServer } from 'http';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import * as hbs from 'express-handlebars';
import * as logger from 'morgan';

//import my own packages
const siteRoutes = require('./routes/site');
const gameRoutes = require('./routes/game');
import { PlayersRoom } from './myModules/PlayersRoom';


    //setup
    const port = Number(process.env.PORT || 2657); //set port
    const app = express(); //set express as server


    app.use('/', siteRoutes); //add siteRoutes to routes
    app.use('/game', gameRoutes); //add gameRoutes to routes
    

    app.use(express.static(path.join(__dirname, 'public'))); //set public files directory
    app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'})); //prepare engine for rendering HTML from views
    app.set('views', path.join(__dirname, 'views')); //set views dir to proper dir
    app.set('view engine', 'hbs'); //set engine

    app.use(logger('dev')); //logger gives nice logs for POST,GET or/and others

    // Attach WebSocket Server on HTTP Server.npm sta
    const gameServer = new Server({
        server: createServer(app)
    });

    //colyseus event handlers
    gameServer.register("PlayersRoom", PlayersRoom).
    on("create", (room) => console.log("room created:", room.roomId)).
    on("dispose", (room) => console.log("room disposed:", room.roomId));

    app.use("/colyseus", monitor(gameServer));


    gameServer.listen(port);
    console.log(`
    !-- Server started succesfully --
    -- Listening on http://localhost:${ port } --`);
