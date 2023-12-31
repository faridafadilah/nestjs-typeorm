/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Region } from 'src/domain/region.entity';

@Injectable() // here
export class RegionRepository extends Repository<Region> {
  constructor(private dataSource: DataSource) {
    super(Region, dataSource.createEntityManager());
  }
}