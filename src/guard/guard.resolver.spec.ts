import { Test, TestingModule } from '@nestjs/testing';
import { GuardResolver } from './guard.resolver';

describe('GuardResolver', () => {
  let resolver: GuardResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuardResolver],
    }).compile();

    resolver = module.get<GuardResolver>(GuardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
