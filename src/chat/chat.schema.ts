import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

const Message = raw({
    Sender : {type : String},
    Message : {type : String},
    Time : {type : Date , default : Date.now}
})

@Schema({timestamps : true})
export class Chat  extends Document {
    @Prop()
    Name : string;
    @Prop()
    IsGroup : boolean;
    @Prop()
    ImageUrl : string;
    @Prop({type : Types.ObjectId , ref : "User"})
    Admin : Types.ObjectId;
    @Prop({type : [Types.ObjectId] , ref : "User"} )
    Participants : Types.ObjectId[];
    @Prop({type : [Message]})
    Messages : Record<string, any>[];
    @Prop({type : Message})
    LastMessage : Record<string, any>[]

}
export const ChatSchema = SchemaFactory.createForClass(Chat);