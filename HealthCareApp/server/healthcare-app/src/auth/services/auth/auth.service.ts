import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entities/staff.entity';
import { Repository } from 'typeorm';
import {JwtService} from "@nestjs/jwt";

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Staff) private staffRepository: Repository<Staff>,
        private readonly jwtService: JwtService
    ) {}

    async logIn(username: string, password: string) {
        const staff = await this.staffRepository.findOneBy({ username: username });

        if(!staff) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        };

        if(!await bcrypt.compare(password, staff.password)) {
            throw new BadRequestException('invalid credentials');
        };

        const payload = { id: staff.id, username: staff.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
