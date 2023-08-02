import { Module } from "@nestjs/common";
import { MyGateWay } from "./gateway";
import { ReceivingCard } from "src/entities/receiving-card.entity";
import { Staff } from "src/entities/staff.entity";
import { Department } from "src/entities/department.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Patient } from "src/entities/patient.entity";
import { ReceivingCardDetail } from "src/entities/receiving-card-detail.entity";
import { StaffTicket } from "src/entities/staff-ticket.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ReceivingCard, Department, Patient, ReceivingCardDetail, StaffTicket])],
    providers: [MyGateWay]
})
export class GatewayModule {}