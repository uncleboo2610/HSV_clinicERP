import { Module } from '@nestjs/common';
import { ImaginingDiagnosticService } from './services/imagining-diagnostic/imagining-diagnostic.service';
import { ImaginingDiagnosticController } from './controllers/imagining-diagnostic/imagining-diagnostic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImaginingDiagnostic } from 'src/entities/imagining-diagnostic';

@Module({
  imports: [TypeOrmModule.forFeature([ImaginingDiagnostic], 'healthcare_image')],
  providers: [ImaginingDiagnosticService],
  controllers: [ImaginingDiagnosticController]
})
export class ImaginingDiagnosticModule {}
