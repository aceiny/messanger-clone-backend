import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { Chat, ChatSchema } from './chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';

@Module({
  imports : [
    MongooseModule.forFeature([{name : Chat.name, schema : ChatSchema}]),
    AuthModule],
  controllers: [ChatController],
  providers: [ChatService , ChatGateway]
})
export class ChatModule {}
