import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  findAll() {
    return this.animalRepository.find();
  }

  async findOne(id: string) {
    const animal = await this.animalRepository.findOne(id);
    if (!animal) {
      throw new NotFoundException(`Animal #${id} not found!`);
    }
  }

  create(createAnimalDto: CreateAnimalDto) {
    const animal = this.animalRepository.create(createAnimalDto);
    return this.animalRepository.save(createAnimalDto);
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.animalRepository.preload({
      id: +id,
      ...updateAnimalDto,
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
}
