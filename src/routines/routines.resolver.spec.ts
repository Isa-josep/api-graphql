import { Test, TestingModule } from '@nestjs/testing';
import { RoutinesResolver } from './routines.resolver';

describe('RoutinesResolver', () => {
  let resolver: RoutinesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutinesResolver],
    }).compile();

    resolver = module.get<RoutinesResolver>(RoutinesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
