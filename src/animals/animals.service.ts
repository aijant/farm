import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal } from './entities/animal.entity';
@Injectable()
export class AnimalsService {
  private animals: Animal[] = [
    {
      id: 1,
      name: 'TEST',
      age: 12,
      status: ['TEST!', 'TEST@'],
    },
  ];

  findAll() {
    return this.animals;
  }

  findOne(id: string) {
    const animal = this.animals.find((item) => item.id === +id);
    if (!animal) {
      throw new NotFoundException(`Animal #${id} not found!`);
    }
  }

  create(createAnimalDto: any) {
    this.animals.push(createAnimalDto);
    return createAnimalDto;
  }

  update(id: string, updateAnimalDto: any) {}

  remove(id: string) {
    const animalIndex = this.animals.findIndex((item) => item.id === +id);
    if (animalIndex >= 0) {
      this.animals.splice(animalIndex, 1);
    }
  }
}
