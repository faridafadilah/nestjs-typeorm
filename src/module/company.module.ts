/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/domain/company.entity';
import { CompanyController } from 'src/web/rest/company.controller';
import { CompanyService } from 'src/service/company.service';
import { CompanyRepository } from 'src/repository/company.repository';
import { CompanyMapper } from 'src/service/mapper/company.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    CompanyRepository,
    CompanyMapper,
  ],
})
export class CompanyModule {}
