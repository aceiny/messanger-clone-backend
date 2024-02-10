import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
require('dotenv').config()
@Module({
  imports: [
     MongooseModule.forRoot(process.env.MONGO_URI) , 
     AuthModule, ChatModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
