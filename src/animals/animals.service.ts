import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { Status } from './entities/status.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
  ) {
    const databaseHost = this.configService.get('database.host', 'localhost');
    console.log(databaseHost);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.animalRepository.find({
      relations: ['status'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const animal = await this.animalRepository.findOne(id, {
      relations: ['status'],
    });
    if (!animal) {
      throw new NotFoundException(`Animal #${id} not found!`);
    }
  }

  async create(createAnimalDto: CreateAnimalDto) {
    const status = await Promise.all(
      createAnimalDto.status.map((name) => this.preloadStatusByName(name)),
    );

    const animal = this.animalRepository.create({
      ...createAnimalDto,
      status,
    });
    return this.animalRepository.save(animal);
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const status = await Promise.all(
      updateAnimalDto.status.map((name) => this.preloadStatusByName(name)),
    );

    const animal = await this.animalRepository.preload({
      id: +id,
      ...updateAnimalDto,
      status,
    });
    if (!animal) {
      throw new NotFoundException(`Animal #${id} not found!`);
    }
    return this.animalRepository.save(animal);
  }

  async remove(id: string) {
    const animal = await this.animalRepository.findOne(id);
    return this.animalRepository.remove(animal);
  }
  async recommendationsAnimal(animal: Animal) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      animal.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_animal';
      recommendEvent.type = 'animal';
      recommendEvent.payload = { animalId: animal.id };

      await queryRunner.manager.save(animal);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadStatusByName(name: string): Promise<Status> {
    const existingStatus = await this.statusRepository.findOne({ name });
    if (existingStatus) {
      return existingStatus;
    }
    return this.statusRepository.create({ name });
  }
}
