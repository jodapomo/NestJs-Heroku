import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  // let userModel: Model<User>;
  let userModel;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue:  {}
        },
        {
          provide: getModelToken('Note'),
          useValue:{}
        },
      ],
    }).compile();
    usersService = module.get<UsersService>(UsersService);


    // userModel = {
    //   find: function () {
    //     return this;
    //   },
    //   populate: function () {
    //     return this;
    //   },
    //   exec: function() {
    //     return this;
    //   }
    // }
  });
  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {

    it('should return all the users', async () => {

      const result = ['test']

      const spy = jest.spyOn(usersService, 'findAll', 'get')

      usersService.findAll();

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();

    })

  })

  describe('findOne', () => {

    it('should return a single user by passing his id', async () => {

      const spy = jest.spyOn(usersService, 'findById', 'set')

      usersService.findById('1a');

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
      
    })

    it('should return a single user by passing his username', async () => {

      const spy = jest.spyOn(usersService, 'findByUsername', 'set')

      usersService.findByUsername('johndoe');

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    })

  })

  describe('create', () => {

    it('should create a new user and return the created user', async () => {

      const newUser = { 
        _id: '3a', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: []
      }

      const spy = jest.spyOn(usersService, 'create', 'set')

      usersService.create(newUser);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    })

  })

  describe('update', () => {

    it('should update an existing user and return the updated user', async () => {

      const body: CreateUserDto = { 
        username: 'johndoe3',
        name: 'John Doe III',
        notes: []
      }

      const spy = jest.spyOn(usersService, 'update', 'set')

      usersService.update('4b', body);

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    })

  })

  describe('delete', () => {

    it('should delete an existing user and return a message', async () => {

      const spy = jest.spyOn(usersService, 'delete', 'set')

      usersService.delete('4b');

      expect(spy).toHaveBeenCalled();

      spy.mockRestore();
    })

  })

});
