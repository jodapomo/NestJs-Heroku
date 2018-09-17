import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteSchema } from './schemas/note.schema';
import { UsersService } from 'users/users.service';
import { UserSchema } from 'users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }]), MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [NotesController],
  providers: [NotesService, UsersService]
})
export class NotesModule {}
