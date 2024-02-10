import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateChatDto } from './Dtos/create.chat.dto';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private chatModel : Model<Chat>
    ) {}
    async createChat(user : any , ChatDto: CreateChatDto) : Promise<Chat>{
        console.log(user)
        if(ChatDto.Participants.length < 1) throw new InternalServerErrorException("Participants are required");
        if(ChatDto.Participants.includes(user.Id)) throw new InternalServerErrorException("You are already a participant");
        if(ChatDto.IsGroup && !ChatDto.Name) throw new InternalServerErrorException("Name is required for group chat");
        if(ChatDto.IsGroup && !ChatDto.ImageUrl) throw new InternalServerErrorException("Image is required for group chat");
        if(!ChatDto.IsGroup && ChatDto.Participants.length > 1) throw new InternalServerErrorException("this is not a group chat , you can only add one participant")
        const newChat = this.chatModel.create({
            Name : ChatDto.Name,
            IsGroup : ChatDto.IsGroup,
            ImageUrl : ChatDto.ImageUrl,
            Admin : user.Id,
            Participants : [...ChatDto.Participants , user.Id],
        });
        if(!newChat) throw new InternalServerErrorException("Chat not created");
        return newChat;
    }
    async getChats(user : any) : Promise<Chat[]>{
        const chats = await this.chatModel.find({Participants : user.Id});
        if (!chats) throw new NotFoundException("You dont have any chats yet");
        return chats;
    }
    async getChat(user : any , chatId : string) : Promise<Chat>{
        const chat = await this.chatModel.findOne({Participants : user.Id , _id : chatId});
        if (!chat) throw new NotFoundException("This chat doesnt exist or you are not a participant");
        return chat;
    }
    async SendMessage(user : any , chatId : string , message : any) : Promise<Chat>{
        const chat = await this.getChat(user,chatId)
        const messageObj : any = {
            Sender : user.Id,
            Message : message.Message,
        }
        chat.Messages.push(messageObj);
        chat.LastMessage = messageObj;
        await chat.save();
        if (!chat) throw new InternalServerErrorException("Message not sent");
        return chat;  
    }
}
