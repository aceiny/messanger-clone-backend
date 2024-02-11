import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server , Socket } from "socket.io";
import { ChatService } from "./chat.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@WebSocketGateway({
    cors : true
})
export class ChatGateway {
    constructor(
        private chatService : ChatService
    ){}
    @WebSocketServer() server : Server;

    handleConnection(client : Socket){
        console.log("New Connection : " + client.id)
    }
    handleDisconnect(client : Socket){
        console.log("Disconnected : " + client.id)
    }

    @SubscribeMessage("leave")
    async createChat(client : Socket , payload : any) : Promise<any>{
        client.leave(payload.chatId);
        console.log(client.rooms)
        this.server.to(payload.chatId).emit("left" , payload.chatId);
    }

    @SubscribeMessage("join")
    async joinChat(client : Socket , payload : any) : Promise<any>{
        client.join(payload.chatId);
        console.log(client.rooms)
        this.server.to(payload.chatId).emit("joined" , payload.chatId);
    }
    @SubscribeMessage("chat")
    handleMessage(client : Socket , payload : any) : any{
        console.log(client.rooms)
        this.server.emit("message" , payload)
    }
}