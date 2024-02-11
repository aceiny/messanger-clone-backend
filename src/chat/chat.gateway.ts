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
        this.server.to(payload.chatId).emit("left" , payload.chatId);
    }

    @SubscribeMessage("join")
    async joinChat(client : Socket , payload : any) : Promise<any>{
        payload.chats.forEach((room : string) => {
            client.join(room);
        })
        this.server.to(payload.chatId).emit("joined" , payload.chatId);
    }
    @SubscribeMessage("message")
    handleMessage(client : Socket , payload : any) : any{
        client.broadcast.to(payload.chatId).emit("message" , payload);
    }
}