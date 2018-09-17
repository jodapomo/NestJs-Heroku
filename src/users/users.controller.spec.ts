import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

describe('Users Controller', () => {
  let module: TestingModule;
  let usersService: UsersService;
  let usersController: UsersController;
  let res;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {} 
        },
        {
          provide: getModelToken('Note'),
          useValue: {} 
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);

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
    const controller: UsersController = module.get<UsersController>(UsersController);
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {

    it('should return an array of users', async () => {
      const result = ['test']
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result);

      expect(await usersController.getUsers(res)).toBe(result)

    })

    it('should return an array empty', async () => {
      const result = []
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result)
      expect(await usersController.getUsers(res)).toBe(result)
    })

  })

  describe('findOne', () => {

    it('should return an user specific by passing his id', async () => {

      const result = { 
        _id: '1a', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: [{
          _id: '2b',
          text: "This is a mock",
          createdAt: "5/09/18",
          updatedAt: "5/09/18"
        }]
      }

      jest.spyOn(usersService, 'findById').mockImplementation(() => result)

      expect(await usersController.getUser(res,"1a")).toBe(result)
    })

    it('should return an user specific by passing his username', async () => {

      const result = { 
          _id: '1a', 
          username: 'johndoe',
          name: 'John Doe', 
          notes: [{
            _id: '2b',
            text: "This is a mock",
            createdAt: "5/09/18",
            updatedAt: "5/09/18"
          }]
        }

      jest.spyOn(usersService, 'findByUsername').mockImplementation(() => result)

      expect(await usersController.getUserByUsername(res,"johndoe")).toBe(result)
    })

    // it('should return an empty object', async () => {
    //   const result = {}
    //   jest.spyOn(userService, 'findOne').mockImplementation(() => result)

    //   const mockRequest = { params: { id: 0 } }
    //   expect(await userController.findOne(mockRequest)).toBe(result)
    // })

  })

  describe('create', () => {

    it('should create a new user and return the user created', async () => {

      const newUser = { 
          _id: '3a', 
          username: 'johndoe',
          name: 'John Doe', 
          notes: []
        }

      jest.spyOn(usersService, 'create').mockImplementation(() => newUser)

      expect(await usersController.createUser(res,newUser)).toBe(newUser)
    })

  })

  describe('update', () => {

    it('should update an existing user and return the user updated', async () => {

      const user = { 
        _id: '4b', 
        username: 'johndoe',
        name: 'John Doe', 
        notes: []
      }

      const body: CreateUserDto = { 
        username: 'johndoe3',
        name: 'John Doe III',
        notes: []
      }

      const result = { 
          _id: '4b', 
          username: 'johndoe3',
          name: 'John Doe III', 
          notes: []
        }

      jest.spyOn(usersService, 'update').mockImplementation(() => result)

      expect(await usersController.updateUser('4b', res, body)).toBe(result)
    })

  })


  describe('delete', () => {

    it('should delete an existing user and return a message', async () => {

      const user = { 
          _id: '4b', 
          username: 'johndoe3',
          name: 'John Doe III', 
          notes: []
        }

      jest.spyOn(usersService, 'delete').mockImplementation(() => 'The user has been deleted')

      expect(await usersController.deleteUser('4b', res)).toBe('The user has been deleted')
    })

  })
});
