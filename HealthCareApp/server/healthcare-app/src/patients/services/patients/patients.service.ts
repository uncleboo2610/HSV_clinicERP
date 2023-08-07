import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { CreatePatientDto } from 'src/patients/dtos/Patient.dto';
import { UpdatePatientDto } from 'src/patients/dtos/UpdatePatient.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsService {

    constructor(
        @InjectRepository(Patient) private patientRepository: Repository<Patient>,
    ) {}

    getPatients() {
        return this.patientRepository.find({ relations: ['medical_report'] });
    }

    getPatientById(patientId: string) {
        return this.patientRepository.findOneBy({ id: patientId })
    }

    createPatient(patientDetails: CreatePatientDto) {
        const newPatient = this.patientRepository.create({
            ...patientDetails,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return this.patientRepository.save(newPatient);
    }

    updatePatient(id: string, patientDetails: UpdatePatientDto) {
        return this.patientRepository.update({ id }, { 
            ...patientDetails,
            updatedAt: new Date() 
        });
    }

    deletePatient(id: string) {
        return this.patientRepository.delete({ id });
    }
}
