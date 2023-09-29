import { Controller, Get } from '@nestjs/common';
import { TypeSolutionService } from '../../services/type-solution/type-solution.service';

@Controller('type-solution')
export class TypeSolutionController {

    constructor(
        private typeSolutionService: TypeSolutionService
    ) {}

    @Get('get-type-solutions')
    getTypeSolution() {
        return this.typeSolutionService.getTypeSolution();
    }
}
