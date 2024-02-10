import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Chat } from './chat.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private chatModel : Model<Chat>
    ) {}
}
