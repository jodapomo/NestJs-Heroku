import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { debug } from 'console';
import { Note } from 'notes/interfaces/note.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Note') private readonly noteModel: Model<Note>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userModel.find().populate('notes').exec();
    }

    async findById(ID: String): Promise<User> {
        return await this.userModel.findById(ID).populate('notes').exec();
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userModel.findOne({'username': username}).populate('notes');
    }
    async create( createUserDto: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async update(ID: String, newValue: any): Promise<User> {
        const user = await this.userModel.findById(ID).exec();

        if (!user._id) {
            debug('User not found');
        }

        await this.userModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.userModel.findById(ID).populate('notes').exec();
    }
    async delete(ID: String): Promise<string> {
        try {
            await this.userModel.findByIdAndRemove(ID).exec();
            return 'The user has been deleted';
        }
        catch (err){
            debug(err);
            return 'The user could not be deleted';
        }
    }
}
