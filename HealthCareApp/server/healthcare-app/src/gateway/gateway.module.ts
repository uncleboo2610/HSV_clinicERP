import { Module } from "@nestjs/common";
import { MyGateWay } from "./gateway";
import { ReceivingCard } from "src/entities/receiving-card.entity";
import { Staff } from "src/entities/staff.entity";
import { Department } from "src/entities/department.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "src/entities/patient.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ReceivingCard, Department, Patient])],
    providers: [MyGateWay]
})
export class GatewayModule {}