import { IsArray, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    Name: string;
    @IsNotEmpty()
    @IsBoolean()
    IsGroup: boolean;

    ImageUrl: string;
    @IsArray()
    @IsNotEmpty({each : true})
    Participants: string[];
}