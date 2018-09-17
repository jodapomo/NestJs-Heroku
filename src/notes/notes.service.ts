import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'users/interfaces/user.interface';
import { Model, Schema } from 'mongoose';
import { Note } from './interfaces/note.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UsersService } from '../users/users.service';
import { debug } from 'console';

@Injectable()
export class NotesService {
    constructor(
        @InjectModel('Note') private readonly noteModel: Model<Note>,
        private readonly usersService: UsersService
    ) {}

    async findAll(): Promise<Note[]> {
        return await this.noteModel.find().exec();
    }

    async findById(ID: String): Promise<Note> {
        return await this.noteModel.findById(ID).exec();
    }

    async create( createNoteDto: CreateNoteDto): Promise<Note> {

        let newNote = new this.noteModel(createNoteDto);

        newNote = await newNote.save();

        let username = createNoteDto.username;
        const user = await this.usersService.findByUsername(username);

        const body = {$push: { notes: newNote._id }};

        await this.usersService.update(user._id, body);

        return newNote;


    }

    async update(ID: String, newValue: any): Promise<Note> {
        const user = await this.noteModel.findById(ID).exec();

        if (!user._id) {
            debug('Note not found');
        }

        await this.noteModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.noteModel.findById(ID).exec();
    }
    async delete(ID: String): Promise<string> {
        try {
            await this.noteModel.findByIdAndRemove(ID).exec();
            return 'The note has been deleted';
        }
        catch (err){
            debug(err);
            return 'The note could not be deleted';
        }
    }

}
