import assert from 'assert';
import { createSandbox, createStubInstance, SinonSandbox } from 'sinon';
import * as typeorm from 'typeorm';
import { User } from '../modules/users/entities/user';
import { userService } from '../modules/users/services/user.service';

describe('userService => getAllTasks', () => {
  let sandbox: SinonSandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('getAll method passed', async () => {
    const fakeRepository = createStubInstance(typeorm.Repository);
    const fakeConnection = createStubInstance(typeorm.Connection);
    fakeConnection.getRepository.withArgs(User).returns(fakeRepository as any);

    sandbox.stub(typeorm, 'getConnection').returns(fakeConnection as any);

    const result = await userService.getAllUsers();
    assert.strictEqual(result.length, 10);
  });
});
