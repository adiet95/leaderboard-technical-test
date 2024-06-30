import { Test, TestingModule } from '@nestjs/testing';
import { Validator } from './validator';

describe('Validator', () => {
  let provider: Validator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Validator],
    }).compile();

    provider = module.get<Validator>(Validator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
