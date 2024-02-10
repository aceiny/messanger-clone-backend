import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
    constructor(private chatService : ChatService){}

    @Post('')
    @UseGuards(AuthGuard())
    async createChat(@GetUser() user : any , @Body() body : any ) : Promise<any>{
        return await this.chatService.createChat(user , body);
    }

    @Get('')
    @UseGuards(AuthGuard())
    async getChats(@GetUser() user : any) : Promise<any>{
        console.log(user)
        return await this.chatService.getChats(user);
    }

    @Get('/;id')
    @UseGuards(AuthGuard())
    async getChat(@GetUser() user : any , @Param('id') id : string ) : Promise<any>{
        return await this.chatService.getChat(user , id);
    }
    @Post('/message/:id')
    @UseGuards(AuthGuard())
    async SendMessage(@GetUser() user : any , @Param('id') ChatId : string , @Body() message : any) : Promise<any>{
        return await this.chatService.SendMessage(user,ChatId,message);
    }
}
