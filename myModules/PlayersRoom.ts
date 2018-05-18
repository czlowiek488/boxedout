//Provided modules
import { Room, Client } from "colyseus";
//My main modules
import { Engine } from '../myModules/GameEngine';
import { Vector } from "./modules/vector";

export class PlayersRoom extends Room<Engine> {
  maxClients = 2;

  onInit (options) {
    this.setState(new Engine(
      new Vector(900, 1600), //resolution to calc
      new Vector(13,21), //dimension of tiles
      5 //ammount of balls
    ));
    this.setSimulationInterval((time) => this.update(time), 100); //simulation interval(16.66666666666667ms = 60fps)
  }

  update (time) {
    //console.log(time); // check delay and fix update IN THE FUTURE !!!!!!!!!!!!!!!!!!!!!!!!!
    this.state.update();
  
  }


  onJoin (client, options, auth) {
    let id = this.clients.length-1;
    console.log(`client - ${client.sessionId} - joined: ${this.roomId} - as: ${id}`);
    this.state.playerAdd(client.sessionId, id);
    
    if(this.clients.length < 2 ){
      console.log(`waiting for second player in room: ${this.roomId}`);
      this.sendRoomStatus(client, 1); //'waiting for second player in room'
    } else {
      this.clients.forEach(element => {
        let data = {
          task: "setEngine",
          gameData: this.state,
          playerData: {
            id: this.state.playerIndex(element.sessionId),
            controls: this.state.players[ this.state.playerIndex(element.sessionId) ].controls,
          }
        };
        this.send(element, data);  
      console.log('room filled with players');
      this.sendRoomStatus(element, 0); //'players found' 
      });
    }
  }

  requestJoin (options, isNewRoom: boolean) {
    options.create = isNewRoom;
      return (options.create)
          ? (options.create && isNewRoom)
          : this.clients.length > 0;
  }

  onMessage (client, message: any) {
    console.log(message.task);
    if(message.task == 'move') {
      let index = this.state.playerIndex(client.sessionId);
      this.state.playerVector(index ,new Vector(message.data.x, message.data.y));
    } else if( message.task == 'leaveRoom') {
      console.log(`client - ${client.sessionId} - left - ${this.roomId}`);
      this.clients.forEach(element => {
        if(element == client) this.sendRoomStatus(element, 2); //'you left room'
        else this.sendRoomStatus(element, 3); //'enemy left room'
      });
    }
  }

  onLeave (client) {
    this.disconnect();
  }

  sendRoomStatus(client, status) {
    this.send(client, {
      task: 'setRoomStatus',
      status: status,
    });
  }
}