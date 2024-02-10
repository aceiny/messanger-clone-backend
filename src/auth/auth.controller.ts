import { Body, Controller, Get, Post,  Query,  UseGuards,  UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto} from './Dtos/LoginDto';
import { SignUpDto } from './Dtos/SignUpDto';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService
        ){} 
           
    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() SignUpDto : SignUpDto){
        return this.authService.Signup(SignUpDto)
    }

    @Post('/login')
    @UsePipes(ValidationPipe)
    login(@Body() LoginDto : LoginDto){
        return this.authService.Login(LoginDto)
    }
    @Get('/checkToken')
    @UseGuards(AuthGuard())
    checkToken(@Body() token : any){
        return {
            Status : 200,
            Message : "Token is valid"
        }
    }
    @Get('')
    GetUsers(@Query() query : any){
        return this.authService.GetUsers(query)
    }
    @Get('/user')
    @UseGuards(AuthGuard())
    GetUser(@GetUser() user : any){
        return this.authService.GetUser(user)
    }
}
