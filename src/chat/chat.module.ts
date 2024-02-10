import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { Chat, ChatSchema } from './chat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports : [
    MongooseModule.forFeature([{name : Chat.name, schema : ChatSchema}]),
    AuthModule],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
