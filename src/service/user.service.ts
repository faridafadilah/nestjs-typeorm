import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
import { CreateUserDto } from '../service/dto/create-user.dto';
import { UpdateUserDto } from '../service/dto/update-user.dto';
import { User } from '../domain/user.entity';
import { UserRepository } from '../repository/user.repository';
import { UserDTO } from './dto/user.dto';
// import { UserMapper } from './mapper/user.mapper';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PageOptionsDto } from 'src/domain/base/page.options';
import { PageDto } from 'src/domain/base/pagination.entity';
import { PageMetaDto } from 'src/domain/base/page.meta';
import { CompanyRepository } from 'src/repository/company.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly companyRepository: CompanyRepository,
    @InjectMapper() private readonly userMapper: Mapper,
  ) {}

  public async getUsersPaginate(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<UserDTO>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .orderBy('user.createdDate', pageOptionsDto.order)
      .skip((pageOptionsDto.page - 1) * pageOptionsDto.take)
      .take(pageOptionsDto.take);

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    // Map entities to UserDTO
    const userDTOs = entities.map((entity) =>
      this.userMapper.map(entity, User, UserDTO),
    );

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    return new PageDto(userDTOs, pageMetaDto);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDTO | undefined> {
    const entity = this.userMapper.map(createUserDto, CreateUserDto, User);
    const company = await this.companyRepository.findOneBy({
      id: createUserDto.companyId,
    });
    if (!company) {
      throw new HttpException(
        'Error, region Id not found!',
        HttpStatus.NOT_FOUND,
      );
    }
    entity.company = company;
    const result = await this.userRepository.save(entity);
    return this.userMapper.mapAsync(result, User, UserDTO);
  }

  async findAll(): Promise<UserDTO[]> {
    try {
      const result = await this.userRepository.find({
        relations: ['company'],
      });
      return this.userMapper.mapArrayAsync(result, User, UserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async findOne(id: number): Promise<UserDTO | undefined> {
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.company', 'company')
        .where('user.id = :id', { id })
        .getOne();
      return this.userMapper.mapAsync(result, User, UserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDTO | undefined> {
    if (!id) throw new Error(`update error: id is empty.`);
    try {
      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOneBy({ id });
      return this.userMapper.mapAsync(updatedUser, User, UserDTO);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    if (!id) throw new Error(`remove error: id is empty.`);
    try {
      return this.userRepository.delete(id);
    } catch (ex) {
      throw new Error(`findAll error: ${ex.message}.`);
    }
  }
}
