import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { SurveyModule } from './survey/survey.module';
import { AdminModule } from './admin/admin.module';
require('dotenv').config()
@Module({
  imports: [
     MongooseModule.forRoot(process.env.MONGO_URI) , 
     AuthModule, EnterpriseModule, SurveyModule, AdminModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
