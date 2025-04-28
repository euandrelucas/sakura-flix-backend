/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const hashedPassword: string = await (bcrypt.hash(
      data.password,
      10,
    ) as Promise<string>);

    const user = await this.prisma.user
      .create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
        },
      })
      .catch((error) => {
        if (error.code === 'P2002') {
          throw new Error('E-mail já cadastrado');
        }
        throw error;
      });

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return userWithoutPassword;
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const updateData: Partial<UpdateUserDto> = { ...data };

    if (data.password) {
      updateData.password = await (bcrypt.hash(
        data.password,
        10,
      ) as Promise<string>);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmailAndPassword(email: string, password: string) {
    if (!email || !password) {
      return null;
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return userWithoutPassword;
  }
}
