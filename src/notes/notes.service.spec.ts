import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { NotesService } from './notes.service';


describe('NotesService', () => {
  let notesService: NotesService;
  let usersService: UsersService;
  let noteModel;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    
    notesService = module.get<NotesService>(NotesService);
    usersService = module.get<UsersService>(UsersService);

    noteModel = {
      find: function(responseStatus) {
          return this; 
      }
    }

  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });

  describe('findAll', () => {

    it('should return all the notes', async () => {

      const spy = jest.spyOn(notesService, 'findAll', 'get')
      notesService.findAll();
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();

    })

  })

  describe('findOne', () => {

    it('should return a single note by passing it id', async () => {

      const spy = jest.spyOn(notesService, 'findById', 'set')
      notesService.findById('2b');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();

    })

  })

  describe('create', () => {

    it('should create a new note, assign it to his user and return the created note', async () => {

      const newNoteDto = { 
        text: 'This is a mock note',
        username: 'johndoe'
      }

      const spy = jest.spyOn(notesService, 'create', 'set')
      notesService.create(newNoteDto);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();

    })

  })

  describe('update', () => {

    it('should update a note by passing the id and the body of the update, return the note created', async () => {

      const body = { 
        text: 'This is a mock note updated',
      }

      const spy = jest.spyOn(notesService, 'update', 'set')
      notesService.update('2b',body);
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    })

  })

  describe('delete', () => {

    it('should delete an existing note and return a message', async () => {

      const spy = jest.spyOn(notesService, 'delete', 'set')
      notesService.delete('2b');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
      
    })

  })


});
