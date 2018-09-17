import { Controller, Get, Response, HttpStatus, Post, Body, Patch, Delete, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@ApiUseTags('notes')
@Controller('api/v1/notes')
export class NotesController {
    constructor(private readonly notesService: NotesService){}

    @ApiOperation({ title: 'Get all notes', description: "Return a json array with all the notes" })
    @Get()
    public async getNotes(@Response() res) {
        const notes = await this.notesService.findAll();
        return res.status(HttpStatus.OK).json(notes);
    }

    @ApiOperation({ title: 'Get a single note passing the _id.', description: "Return a single note by _id." })
    @Get('/:id')
    public async getNote(@Response() res, @Param('id') id: String){
        const note = await this.notesService.findById(id);
        return res.status(HttpStatus.OK).json(note);
    }

    @ApiOperation({ title: 'Create a note.', description: "Create a note passing the text and the username of the user that own it." })
    @Post()
    @ApiResponse({ status: 201, description: 'The note has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createNote( @Response() res, @Body() createNoteDto: CreateNoteDto ) {

        const note = await this.notesService.create(createNoteDto);

        return res.status(HttpStatus.CREATED).json(note);
    }

    @ApiOperation({ title: 'Update a single note passing the _id.', description: "In order de update a note you could pass as body an object like this { text: '<Updated text>'}." })
    @Patch('/:id')
    public async updateNote(@Param('id') id: String, @Response() res, @Body() body: CreateNoteDto) {

        const todo = await this.notesService.update(id, body);
        return res.status(HttpStatus.OK).json(todo);
    }

    @ApiOperation({ title: 'Delete a note passing the _id.', description: "Delete a note passing the _id." })
    @Delete('/:id')
    public async deleteNote(@Param('id') id: String, @Response() res) {

        const todo = await this.notesService.delete(id);
        return res.status(HttpStatus.OK).json(todo);
    }
}
