import { Module } from '@nestjs/common';
import { TypeSolutionService } from './services/type-solution/type-solution.service';
import { TypeSolutionController } from './controllers/type-solution/type-solution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSolution } from 'src/entities/type-solution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeSolution])],
  providers: [TypeSolutionService],
  controllers: [TypeSolutionController]
})
export class TypeSolutionModule {}
