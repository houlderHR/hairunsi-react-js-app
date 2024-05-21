import { QueryFailedError } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { Permission } from '../../entities/permission.entity';
import testDataSource from '../datasource';

describe('Role Model tests ', () => {
  let createdRole: Role;

  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.dropDatabase();
    await testDataSource.destroy();
  });

  it('should not be created without permissions', async () => {
    const role = new Role();
    role.name = 'test';

    try {
      await testDataSource.getRepository(Role).save(role);
      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof QueryFailedError) expect(true).toBe(true);
    }
  });

  it('should create one role', async () => {
    let permission = new Permission();
    permission.name = 'Permission test';
    let role = new Role();
    role.name = 'Role test';

    try {
      role = await testDataSource.getRepository(Role).save(role);
      role.permissions = [permission];
      createdRole = await testDataSource.getRepository(Role).save(role);
      expect(createdRole.name).toBe(role.name);
    } catch (error) {
      fail();
    }
  });

  // it('should fail to create duplicate department with same name', async () => {
  //   let role = new Role();
  //   role.name = 'Role teste';
  //   let department = new Department();
  //   department.name = 'test';

  //   try {
  //     role = await testDataSource.getRepository(Role).save(role);
  //     department.role = role;
  //     await testDataSource.getRepository(Department).save(department);
  //     await testDataSource.getRepository(Department).save(department);
  //     fail();
  //   } catch (error) {
  //     if (error instanceof QueryFailedError) expect(true).toBe(true);
  //   }
  // });

  // it('name length should be greater than 4', async () => {
  //   let department = new Department();
  //   department.name = 'tet';

  //   try {
  //     let role = await testDataSource
  //       .getRepository(Role)
  //       .findOne({ where: { name: 'Role teste' } });
  //     department.role = role;
  //     await testDataSource.getRepository(Department).save(department);
  //   } catch (error) {
  //     if (error instanceof QueryFailedError) expect(true).toBe(true);
  //   }
  // });

  // it('should get all department', async () => {
  //   try {
  //     let users = await testDataSource
  //       .getRepository(Department)
  //       .find({ relations: { role: true } });
  //     expect(users).toContainEqual(expect.objectContaining(createdDepartment));
  //   } catch (error) {
  //     expect(false).toBe(true);
  //   }
  // });
});
