import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NoteSchema } from 'notes/schemas/note.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
