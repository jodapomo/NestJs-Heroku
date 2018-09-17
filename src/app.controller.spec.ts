import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  it('should be defined', () => {
    const controller: AppController = app.get<AppController>(AppController);
    expect(controller).toBeDefined();
  });

  describe('root', () => {

    let res

    beforeEach(() => {
      res = {
        redirect: jest.fn(() => true),
      }
    })

    it('should call res.redirect"', () => {
      const appController = app.get<AppController>(AppController);

      expect(appController.root(res)).toBeTruthy()
    });
  });
});
