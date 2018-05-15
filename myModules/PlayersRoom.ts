import { Room, Client } from "colyseus";

import { Engine } from '../myModules/GameEngine';

export class PlayersRoom extends Room<Engine> {
  maxClients = 2;

  onInit (options) {
    this.setState(new Engine());
    this.setSimulationInterval((time) => this.update(time), 1000); //simulation interval(16.66666666666667ms = 60fps)
  }

  update (time) {
    console.log(time); // check delay and fix update IN THE FUTURE !!!!!!!!!!!!!!!!!!!!!!!!!
    for (let sessionId in this.state.players) { // loop throw array of players
        this.state.move(sessionId, {x: 0, y: 1}); //move player
    }
  }


  onJoin (client, options, auth) {
    console.log(`client - ${client.sessionId} - joined - ${this.roomId}`);
    this.state.addPlayer(client);
  }

  requestJoin (options, isNewRoom: boolean) {
    options.create = isNewRoom;
      return (options.create)
          ? (options.create && isNewRoom)
          : this.clients.length > 0;
  }

  onMessage (client, message: any) {

  }

  onLeave (client) {
    console.log(`client - ${client.sessionId} - left - ${this.roomId}`);
    this.state.removePlayer(client.sessionId);
  }

}