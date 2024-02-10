import {IsNotEmpty ,  MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    Name  : string
    
    @IsNotEmpty()
    @MinLength(3)
    Username: string;

    @IsNotEmpty()
    @MinLength(8)
    Password  : string 
}