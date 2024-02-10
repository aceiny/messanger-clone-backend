import { IsNotEmpty, IsString } from "class-validator";

export class messageDto {
    @IsNotEmpty()
    @IsString()
    Message: string;
}