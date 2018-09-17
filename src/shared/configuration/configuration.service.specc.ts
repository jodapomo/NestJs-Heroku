import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {

  let service: ConfigurationService;
  let module: TestingModule;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationService,
        {
          provide: 'MONGO_URI',
          useValue: 2
        }
      ],
    }).compile();
    service = module.get<ConfigurationService>(ConfigurationService);
  });


  it('should be defined', () => {
    const service: ConfigurationService = module.get<ConfigurationService>(ConfigurationService);

    expect(service).toBeDefined();
  });
});
