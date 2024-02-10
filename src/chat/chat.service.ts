import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private chatModel : Model<Chat>
    ) {}
    async createChat(user : any , body : any) : Promise<Chat>{
        const newChat = this.chatModel.create({
            Name : body.Name,
            IsGroup : body.IsGroup,
            ImageUrl : body.ImageUrl,
            Admin : user._id,
            Participants : [...body.Participants , user._id],
        });
        if(!newChat) throw new InternalServerErrorException("Chat not created");
        return newChat;
    }
    async getChats(user : any) : Promise<Chat[]>{
        const chats = await this.chatModel.find({Participants : user._id});
        if (!chats) throw new NotFoundException("You dont have any chats yet");
        return chats;
    }
    async getChat(user : any , chatId : string) : Promise<Chat>{
        const chat = await this.chatModel.findOne({Participants : user._id , _id : chatId});
        if (!chat) throw new NotFoundException("This chat doesnt exist or you are not a participant");
        return chat;
    }
    async SendMessage(user : any , chatId : string , message : any) : Promise<Chat>{
        const chat = await this.getChat(user,chatId)
        const messageObj : any = {
            Sender : user._id,
            Message : message.Message,
        }
        chat.Messages.push(messageObj);
        chat.LastMessage = messageObj;
        await chat.save();
        if (!chat) throw new InternalServerErrorException("Message not sent");
        return chat;  
    }
}
