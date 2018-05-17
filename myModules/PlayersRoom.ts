//Provided modules
import { Room, Client } from "colyseus";
//My main modules
import { Engine } from '../myModules/GameEngine';
import { Vector } from "./modules/vector";

export class PlayersRoom extends Room<Engine> {
  maxClients = 2;

  onInit (options) {
    this.setState(new Engine(
      new Vector(900, 1600),
      new Vector(13,21),
      1
    ));
    this.setSimulationInterval((time) => this.update(time), 1000); //simulation interval(16.66666666666667ms = 60fps)
  }

  update (time) {
    //console.log(time); // check delay and fix update IN THE FUTURE !!!!!!!!!!!!!!!!!!!!!!!!!
  
  }


  onJoin (client, options, auth) {
    let id = this.clients.length-1;
    console.log(`client - ${client.sessionId} - joined: ${this.roomId} - as: ${id}`);
    this.state.playerAdd(client.sessionId, id);
    
    if(this.clients.length < 2 ){
      console.log(`waiting for second player in room: ${this.roomId}`);
      this.sendRoomStatus(client, 'waiting for second player in room');
    } else {
      this.clients.forEach(element => {
        this.sendRoomStatus(element, 'players found'); 
        this.send(element, {
          task: "setEngine",
          gameData: this.state,
          playerData: {
            id: this.state.playerIndex(element.sessionId),
            controls: this.state.players[ this.state.playerIndex(element.sessionId) ].controls,
          }
        });  
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
    if(message.task == 'move') {
      console.log(message.task);
      let index = this.state.playerIndex(client.sessionId);
      this.state.playerMove(index ,new Vector(message.data.x, message.data.y));
    }
  }

  onLeave (client) {
    console.log(`client - ${client.sessionId} - left - ${this.roomId}`);

    this.clients.forEach(element => {
      if(element == client) this.sendRoomStatus(element, 'you left room');
      else this.sendRoomStatus(element, 'enemy left room');
    });

    this.state.playerRemove(client.sessionId);
  }

  sendRoomStatus(client, string) {
    this.send(client, {
      task: 'setRoomStatus',
      string: string,
    });
  }
}