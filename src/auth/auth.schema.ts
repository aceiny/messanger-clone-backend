import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    Name : string;

    @Prop({unique : true})
    Username: string;
    
    @Prop()
    Password: string;
    
    @Prop({default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"})
    ImageUrl : string;
}

export const UserSchema = SchemaFactory.createForClass(User);