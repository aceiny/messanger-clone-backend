import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateChatDto } from './Dtos/create.chat.dto';
import { messageDto } from './Dtos/message.dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService : ChatService){}

    @Post('')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    async createChat(@GetUser() user : any , @Body() ChatDto : CreateChatDto ) : Promise<any>{
        return await this.chatService.createChat(user , ChatDto);
    }

    @Get('')
    @UseGuards(AuthGuard())
    async getChats(@GetUser() user : any) : Promise<any>{
        console.log(user)
        return await this.chatService.getChats(user);
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    async getChat(@GetUser() user : any , @Param('id') id : string ) : Promise<any>{
        return await this.chatService.getChat(user , id);
    }
    @Post('/message/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    async SendMessage(@GetUser() user : any , @Param('id') ChatId : string , @Body() message : messageDto) : Promise<any>{
        return await this.chatService.SendMessage(user,ChatId,message);
    }
}
