import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeSolution } from 'src/entities/type-solution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeSolutionService {

    constructor (
        @InjectRepository(TypeSolution) private typeSolutionRepository: Repository<TypeSolution>,
    ) {}

    getTypeSolution() {
        return this.typeSolutionRepository.find();
    }
}
