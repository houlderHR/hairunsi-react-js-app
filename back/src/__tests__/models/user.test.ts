import { QueryFailedError } from 'typeorm';
import { Department } from '../../entities/department.entity';
import { File } from '../../entities/file.entity';
import { Permission } from '../../entities/permission.entity';
import { Post } from '../../entities/post.entity';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import testDataSource from '../datasource';

let createdUser: User;
let createdPost: Post;
let createdImage: File;

const checkViolationErrorCode = (error, code: string) => {
  if (error instanceof QueryFailedError) {
    expect(error.driverError.code).toBe(code);
  } else fail();
};
describe('Users', () => {
  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('Should not be created without all fields', async () => {
    try {
      const user = new User();
      createdUser = await testDataSource.getRepository(User).save(user);
      fail();
    } catch (error) {
      expect(error.code).toBe('23502');
    }
  });

  it('Should not be created with duplicated email', async () => {
    try {
      let permission = new Permission();
      permission.name = 'test permission';
      let createdPermission = await testDataSource.getRepository(Permission).save(permission);

      let role = new Role();
      Object.assign(role, {
        name: 'test role',
        permissions: [createdPermission],
      });
      let createdRole = await testDataSource.getRepository(Role).save(role);

      let department = new Department();
      department.name = 'test department';
      department.role = createdRole;
      let createdDepartment = await testDataSource.getRepository(Department).save(department);

      let post = new Post();
      post.name = 'test post';
      post.department = createdDepartment;
      createdPost = await testDataSource.getRepository(Post).save(post);

      let image = new File();
      image.name = 'test image';
      image.path = 'images';
      image.public_id = 'image';
      image.size = 20;
      image.type = 'png';
      createdImage = await testDataSource.getRepository(File).save(image);
      let user = new User();
      user.firstname = 'test';
      user.lastname = 'test';
      user.birth_date = new Date();
      user.email = 'test@gmail.com';
      user.password = 'password';
      user.post = createdPost;
      user.image = createdImage;
      let u1 = await testDataSource.getRepository(User).insert(user);
      const u2 = await testDataSource.getRepository(User).insert(user);
      fail();
    } catch (error) {
      checkViolationErrorCode(error, '23505');
    }
  });

  it('Should be created successfully', async () => {
    try {
      let user = new User();
      user.firstname = 'test';
      user.lastname = 'test';
      user.birth_date = new Date();
      user.email = 'test_test@gmail.com';
      user.password = 'password';
      user.post = createdPost;
      user.image = createdImage;
      createdUser = await testDataSource.getRepository(User).save(user);
      expect(createdUser.email).toBe('test_test@gmail.com');
    } catch (error) {
      fail();
    }
  });

  it('Should be updated successfully', async () => {
    try {
      let user = await testDataSource
        .getRepository(User)
        .findOne({ where: { email: 'test_test@gmail.com' }, relations: { post: true } });
      const updatedUser = await testDataSource
        .getRepository(User)
        .save({ ...user, firstname: 'test update' });
      expect(updatedUser.firstname).toBe('test update');
    } catch (error) {
      fail();
    }
  });

  it('Should get all users', async () => {
    try {
      let users = await testDataSource
        .getRepository(User)
        .find({ relations: { post: true, image: true } });
      expect(users.length).toBe(2);
    } catch (error) {
      fail();
    }
  });

  it('Should delete user', async () => {
    try {
      const user = await testDataSource.getRepository(User).findOne({
        where: { email: 'test@gmail.com' },
        relations: { post: true, image: true },
      });
      const affected = await testDataSource.getRepository(User).remove(user);
      expect(affected.email).toBe('test@gmail.com');
    } catch (error) {
      fail();
    }
  });
});
