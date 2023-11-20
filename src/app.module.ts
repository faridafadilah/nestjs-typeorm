import { Module } from '@nestjs/common';
import { AppController } from './web/rest/app.controller';
import { AppService } from './service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './/module/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/database-exception.filter';
import { dataSourceOptions } from './config/database.config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { RegionModule } from './module/region.module';
import { CountryModule } from './module/country.module';
import { CompanyModule } from './module/company.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    UserModule,
    RegionModule,
    CountryModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
