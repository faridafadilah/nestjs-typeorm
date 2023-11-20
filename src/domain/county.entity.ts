/* eslint-disable prettier/prettier */
import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Region } from './region.entity';
import { AutoMap } from '@automapper/classes';

@Entity('country')
export class Country extends BaseEntity {
  @AutoMap()
  @Column({ type: 'varchar' })
  countryName: string;

  @AutoMap(() => Region)
  @OneToOne(() => Region)
  @JoinColumn()
  region: Region;
}
