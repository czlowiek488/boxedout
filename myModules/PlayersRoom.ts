import { Room, Client } from "colyseus";

import { Engine } from '../myModules/GameEngine';

export class PlayersRoom extends Room<Engine> {
  maxClients = 2;

  onInit (options) {
    this.setState({
      entities: {
        "f98h3f": { x: 0, y: 0, hp: 10 },
        "24jgd3": { x: 100, y: 0, hp: 6 }
      }
  });
    this.setSimulationInterval((time) => this.update(time), 1000);
  }

  update (time) {
    console.log(time); // check delay and fix update IN THE FUTURE !!!!!!!!!!!!!!!!!!!!!!!!!
    for (let entityId in this.state.entities) {
        // simple and naive gravity
        this.state.entities[entityId].y += 1;
    }
  }
  


  onJoin (client, options, auth) {
    console.log(`client - ${client.sessionId} - joined - ${this.roomId}`);
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
  }

}