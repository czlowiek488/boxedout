import { EntityMap } from "colyseus";
import { Player } from './engine/Player';

export class Engine {   
    players: EntityMap<Player> = {};

   addPlayer(sessionId) {
        this.players[ sessionId ] = new Player(0,0);
   }

   removePlayer(sessionId) {
       delete this.players[ sessionId ];
   }

    move(sessionId, pos) {
        this.players[ sessionId ].move(pos);
    }
}