import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeService } from 'src/entities/type-service.entity';
import { TypeServiceDto } from 'src/type-service/dtos/TypeService.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TypeServiceService {

    constructor(
        @InjectRepository(TypeService) private typeServiceRepository: Repository<TypeService>
    ) {}

    getTypeServices() {
        return this.typeServiceRepository.find();
    }

    createTypeService(typeServiceParams: TypeServiceDto) {
        const newTypeService = this.typeServiceRepository.create({
            ...typeServiceParams,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return this.typeServiceRepository.save(newTypeService);
    }

    deleteTypeService(id: number) {
        return this.typeServiceRepository.delete({ id });
    }
}
