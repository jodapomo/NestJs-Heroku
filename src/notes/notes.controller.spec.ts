import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';

describe('Notes Controller', () => {
  let module: TestingModule;
  let usersService: UsersService;
  let notesService: NotesService;
  let notesController: NotesController;
  let res;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        NotesService,
        UsersService,
        {
          provide: getModelToken('Note'),
          useValue: {} 
        },
        {
          provide: getModelToken('User'),
          useValue: {} 
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    notesService = module.get<NotesService>(NotesService);
    notesController = module.get<NotesController>(NotesController);
    
    res = {
      send: function(){ },
      json: function(x){
          return x;
      },
      status: function(responseStatus) {
          return this; 
      }
    }

  });
  it('should be defined', () => {
    const controller: NotesController = module.get<NotesController>(NotesController);
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {

    it('should return an array of notes', async () => {
      const result = ['test']
      jest.spyOn(notesService, 'findAll').mockImplementation(() => result);

      expect(await notesController.getNotes(res)).toBe(result)

    })

    it('should return an array empty', async () => {
      const result = []
      jest.spyOn(notesService, 'findAll').mockImplementation(() => result)
      expect(await notesController.getNotes(res)).toBe(result)
    })

  })

  describe('findOne', () => {

    it('should return a specific note by passing his id', async () => {

      const result = { 
          _id: '2b',
          text: "This is a mock",
          createdAt: "5/09/18",
          updatedAt: "5/09/18"
      }

      jest.spyOn(notesService, 'findById').mockImplementation(() => result)

      expect(await notesController.getNote(res,"2b")).toBe(result)
    })

  })

  describe('create', () => {

    it('should create a new note by passing the text(content) and the username of the user that owns it, return the note created', async () => {

      const newNoteDto = { 
        text: 'This is a mock note',
        username: 'johndoe'
      }

      const newNote = { 
        _id: '2b',
        text: 'This is a mock note',
        createdAt: '5/09/18',
        updatedAt: '5/09/18'
      }


      jest.spyOn(notesService, 'create').mockImplementation(() => newNote)

      expect(await notesController.createNote(res,newNoteDto)).toBe(newNote)
    })

  })

  describe('update', () => {

    it('should update a note by passing the id and the body of the update, return the note created', async () => {

      const note = { 
        _id: '2b',
        text: 'This is a mock note',
        createdAt: '5/09/18',
        updatedAt: '5/09/18'
      }

      const body = { 
        text: 'This is a mock note updated',
        username: ''
      }

      const noteUpdated = { 
        _id: '2b',
        text: 'This is a mock note updated',
        createdAt: '5/09/18',
        updatedAt: '6/09/18'
      }

      jest.spyOn(notesService, 'update').mockImplementation(() => noteUpdated)

      expect(await notesController.updateNote('2b',res,body)).toBe(noteUpdated)
    })

  })

  describe('delete', () => {

    it('should delete an existing note and return a message', async () => {

      const note = { 
        _id: '2b',
        text: 'This is a mock note',
        createdAt: '5/09/18',
        updatedAt: '5/09/18'
      }

      jest.spyOn(notesService, 'delete').mockImplementation(() => 'The note has been deleted')

      expect(await notesController.deleteNote('2b', res)).toBe('The note has been deleted')
    })

  })

});
