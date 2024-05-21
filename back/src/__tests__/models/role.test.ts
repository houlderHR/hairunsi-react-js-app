import { QueryFailedError } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { Permission } from '../../entities/permission.entity';
import testDataSource from '../datasource';

describe('Role Model tests ', () => {
  let createdRole: Role;

  beforeAll(async () => {
    if (
      !process.env.DATABASE_HOST ||
      !process.env.DATABASE_NAME ||
      !process.env.DATABASE_USERNAME ||
      !process.env.DATABASE_PASSWORD ||
      !process.env.DATABASE_PORT
    ) {
      throw new Error('Environment variable is not defined');
    }
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.dropDatabase();
    await testDataSource.destroy();
  });

  it('should create new role', async () => {
    let permission = new Permission();
    let role = new Role();
    permission.name = 'Permission test';
    role.name = 'New role';

    try {
      permission = await testDataSource.getRepository(Permission).save(permission);
      role = await testDataSource.getRepository(Role).save(role);
      role.permissions = [permission];
      createdRole = await testDataSource.getRepository(Role).save(role);
      expect(createdRole.name).toBe(role.name);
    } catch (error) {
      expect(true).toBe(false);
    }
  });

  it('should fail to create duplicate role with same name', async () => {
    let permission = new Permission();
    let role = new Role();
    let duplicateRole = new Role();
    permission.name = 'Permission test';
    role.name = 'duplicate role';
    duplicateRole.name = 'duplicate role';

    try {
      role.permissions = [permission];
      duplicateRole.permissions = [permission];
      await testDataSource.getRepository(Role).save(role);
      await testDataSource.getRepository(Role).save(duplicateRole);
      expect(true).toBe(false);
    } catch (error) {
      expect(error.code).toBe('23505');
    }
  });

  it('should get all roles', async () => {
    try {
      let roles = await testDataSource
        .getRepository(Role)
        .find({ relations: { permissions: true } });
      if (createdRole) {
        expect(roles).toContainEqual(expect.objectContaining(createdRole));
      }
    } catch (error) {
      expect(false).toBe(true);
    }
  });

  it('should update an existing role', async () => {
    if (createdRole) {
      const role = await testDataSource.getRepository(Role).findOne({
        where: { id: createdRole.id },
        relations: { permissions: true },
      });
      Object.assign(role, {
        name: 'update role',
        permissions: createdRole.permissions,
      });

      const updatedRole = await testDataSource.getRepository(Role).save(role);
      expect(updatedRole.name).toBe('update role');
    }
  });
});
