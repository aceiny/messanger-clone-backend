import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './Dtos/SignUpDto';
import { LoginDto} from './Dtos/LoginDto';
import { JwtDto } from './Dtos/jwt.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>,
        private jwtService : JwtService
    ) {}

    async Signup(SignUpDto : SignUpDto) : Promise<JwtDto> {
        const exist = await this.userModel.findOne({ Username : SignUpDto.Username})
        if(exist){
            throw new ConflictException('Username already exist')
        }
        let { Password } = SignUpDto
        const salt = bcrypt.genSaltSync(10);
        Password = bcrypt.hashSync(Password, salt);
        const user = await this.userModel.create({
            ...SignUpDto,
            Password,
            })
        if(!user){
            throw new InternalServerErrorException('User not created');
        }
        return { 
            Status : 200 , 
            Token : this.jwtService.sign({
                Id : user._id,
                Username : user.Username,
                Name : user.Name
            }),
        }
    }

    async Login(LoginDto : LoginDto) : Promise<JwtDto> {
        const user = await this.userModel.findOne({Username : LoginDto.Username})
        if(!user){
            throw new UnauthorizedException('Username not exist')
        }
        if(!bcrypt.compareSync(LoginDto.Password, user.Password)){
            throw new UnauthorizedException('Password not match')
        }
        return { 
            Status : 200 , 
            Token : this.jwtService.sign({
                Id : user._id,
                Username : user.Username,
                Name : user.Name
            }),
        }
    }

}
