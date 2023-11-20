import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionController } from '../web/rest/region.controller';
import { RegionRepository } from '../repository/region.repository';
import { RegionService } from '../service/region.service';
import { Region } from 'src/domain/region.entity';
import { RegionMapper } from 'src/service/mapper/region.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService, RegionRepository, RegionMapper],
})
export class RegionModule {}
