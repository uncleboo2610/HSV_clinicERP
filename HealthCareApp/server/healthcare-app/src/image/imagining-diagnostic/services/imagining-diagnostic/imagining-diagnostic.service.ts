import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImaginingDiagnostic } from 'src/entities/imagining-diagnostic';
import { Repository } from 'typeorm';

@Injectable()
export class ImaginingDiagnosticService {
    constructor(
        @InjectRepository(ImaginingDiagnostic, 'healthcare_image') private imaginingDiagnositcRepository: Repository<ImaginingDiagnostic>
    ) {}

    getImaginingDiagnostic() {
        return this.imaginingDiagnositcRepository.find();
    }

    createImaginingDiagnostic(paraclinicalReportId: string, imageUrl: string[]) {
        imageUrl.map((url: string) => {
            const newData = {
                paraclinicalReportId: paraclinicalReportId,
                imageUrl: url
            }
            const newImage = this.imaginingDiagnositcRepository.create({
                ...newData,
            });
            return this.imaginingDiagnositcRepository.save(newImage);
        })

    }
}
