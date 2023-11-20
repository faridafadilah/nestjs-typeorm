import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../web/rest/user.controller';
import { User } from '../domain/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from 'src/service/mapper/user.mapper';
import { CompanyRepository } from 'src/repository/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper, CompanyRepository],
})
export class UserModule {}
