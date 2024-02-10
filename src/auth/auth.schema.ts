import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { userRole } from "./auth.types";

@Schema()
export class User extends Document {
    @Prop()
    Name : string;
    
    @Prop({unique : true})
    Email: string;
    
    @Prop()
    Password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);