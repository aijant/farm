import { Module } from '@nestjs/common';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Status } from './entities/status.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Status, Event])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
