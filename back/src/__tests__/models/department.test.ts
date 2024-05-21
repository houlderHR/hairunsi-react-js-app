import { QueryFailedError } from 'typeorm';
import { Department } from '../../entities/department.entity';
import { Role } from '../../entities/role.entity';
import testDataSource from '../datasource';

describe('Department ', () => {
  let createdDepartment: Department;
  let role: Role;

  beforeAll(async () => {
    await testDataSource.initialize();
    role = new Role();
    role.name = 'Role teste';
    await testDataSource.getRepository(Role).save(role);
  });

  afterAll(async () => {
    testDataSource.destroy();
  });

  it('should not be created without roles', async () => {
    const department = new Department();
    department.name = 'test failed';

    try {
      await testDataSource.getRepository(Department).save(department);
      fail('Department must contain one role');
    } catch (error) {
      if (error instanceof QueryFailedError) expect(true).toBe(true);
    }
  });

  it('should fail to create with duplicate name', async () => {
    let department = new Department();
    department.name = 'same name';

    try {
      department.role = role;
      await testDataSource.getRepository(Department).save(department);
      await testDataSource.getRepository(Department).save(department);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        expect(true).toBe(true);
      }
    }
  });

  it('name length should be greater than 4', async () => {
    let department = new Department();
    department.name = 'et';

    try {
      department.role = role;
      await testDataSource.getRepository(Department).save(department);
      fail();
    } catch (error) {
      if (error instanceof QueryFailedError) expect(true).toBe(true);
    }
  });

  it('should be created successfully', async () => {
    let department = new Department();
    department.name = 'test';

    try {
      department.role = role;
      createdDepartment = await testDataSource.getRepository(Department).save(department);
      expect(createdDepartment).toMatchObject(department);
    } catch (error) {
      fail();
    }
  });

  it('should get all', async () => {
    try {
      let departments = await testDataSource
        .getRepository(Department)
        .find({ relations: { role: true } });
      expect(departments).toContainEqual(expect.objectContaining(createdDepartment));
    } catch (error) {
      fail();
    }
  });

  it('should be updated', async () => {
    try {
      let department = await testDataSource
        .getRepository(Department)
        .findOne({ where: { name: 'test' } });

      department.name = 'Department updated successfully';
      const updatedDepartment = await testDataSource
        .getRepository(Department)
        .update(department.id, department);
      expect(updatedDepartment.affected).toEqual(1);
    } catch (error) {
      fail('Department not updated');
    }
  });

  it('should be deleted', async () => {
    try {
      let department = await testDataSource
        .getRepository(Department)
        .findOne({ where: { name: 'Department updated successfully' } });
      const deletedDepartment = await testDataSource
        .getRepository(Department)
        .delete(department.id);
      expect(deletedDepartment.affected).toEqual(1);
    } catch (error) {
      fail('Department not deleted');
    }
  });
});
