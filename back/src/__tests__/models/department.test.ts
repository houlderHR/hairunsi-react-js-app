import { QueryFailedError } from 'typeorm';
import { Department } from '../../entities/department.entity';
import { Role } from '../../entities/role.entity';
import testDataSource from '../datasource';

describe('Department ', () => {
  let createdDepartment: Department;

  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    testDataSource.destroy();
  });

  it('should not be created without roles', async () => {
    const department = new Department();
    department.name = 'test';

    try {
      await testDataSource.getRepository(Department).save(department);
      expect(true).toBe(false);
    } catch (error) {
      if (error instanceof QueryFailedError) expect(true).toBe(true);
    }
  });

  it('should create one department', async () => {
    let role = new Role();
    role.name = 'Role teste';
    let department = new Department();
    department.name = 'test';

    try {
      role = await testDataSource.getRepository(Role).save(role);
      department.role = role;
      createdDepartment = await testDataSource.getRepository(Department).save(department);
      expect(role.name).toBe('Role teste');
      expect(createdDepartment.name).toBe('test');
    } catch (error) {
      fail();
    }
  });

  it('should fail to create duplicate department with same name', async () => {
    let role = new Role();
    role.name = 'Role teste';
    let department = new Department();
    department.name = 'test';

    try {
      role = await testDataSource.getRepository(Role).save(role);
      department.role = role;
      await testDataSource.getRepository(Department).save(department);
      await testDataSource.getRepository(Department).save(department);
      fail();
    } catch (error) {
      if (error instanceof QueryFailedError) expect(true).toBe(true);
    }
  });

  it('name length should be greater than 4', async () => {
    let department = new Department();
    department.name = 'tet';

    try {
      let role = await testDataSource
        .getRepository(Role)
        .findOne({ where: { name: 'Role teste' } });
      department.role = role;
      await testDataSource.getRepository(Department).save(department);
    } catch (error) {
      if (error instanceof QueryFailedError) expect(true).toBe(true);
    }
  });

  it('should get all department', async () => {
    try {
      let users = await testDataSource
        .getRepository(Department)
        .find({ relations: { role: true } });
      expect(users).toContainEqual(expect.objectContaining(createdDepartment));
    } catch (error) {
      expect(false).toBe(true);
    }
  });
});
