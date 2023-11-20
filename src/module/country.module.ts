import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from '../web/rest/country.controller';
import { CountryRepository } from '../repository/country.repository';
import { CountryService } from '../service/country.service';
import { Country } from 'src/domain/county.entity';
import { CountryMapper } from 'src/service/mapper/country.mapper';
import { RegionRepository } from 'src/repository/region.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [
    CountryService,
    CountryRepository,
    CountryMapper,
    RegionRepository,
  ],
})
export class CountryModule {}
