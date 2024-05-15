import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Permission } from '../../entities/permission.entity';
import { hashPassword } from '../../utils/hash';
import { File } from '../../entities/file.entity';
import { User } from '../../entities/user.entity';
import { Department } from '../../entities/department.entity';
import { Post } from '../../entities/post.entity';
import { Role } from '../../entities/role.entity';
import logger from '../../utils/logger';

export default class employee implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    let userRepository = dataSource.getRepository(User);
    let user: User = await userRepository.findOneBy({ email: 'test@hairun-technology.com' });
    if (!user) {
      let permissionRepository = dataSource.getRepository(Permission);
      let [permissionUtilisateur, permissionUpdateUser] = [
        await permissionRepository.findOneBy({ name: 'Accès utilisateur' }),
        await permissionRepository.findOneBy({ name: 'Modification utilisateur' }),
      ];
      if (!permissionUtilisateur) {
        permissionUtilisateur = await permissionRepository.save({ name: 'Accès utilisateur' });
      }
      if (!permissionUpdateUser) {
        permissionUpdateUser = await permissionRepository.save({
          name: 'Modification utilisateur',
        });
      }

      let roleRepository = dataSource.getRepository(Role);
      let role = await roleRepository.findOneBy({ name: 'Employé' });
      if (!role) {
        role = await roleRepository.save({
          name: 'Employé',
          permissions: [permissionUtilisateur, permissionUpdateUser],
        });
      }

      const repository = dataSource.getRepository(Department);
      let department = await repository.findOneBy({ name: 'Production' });
      if (!department) {
        department = await repository.save({ name: 'Production', role: role });
      }

      let postRepository = dataSource.getRepository(Post);
      let post = await postRepository.findOneBy({ name: 'Intégrateur' });
      if (!post) {
        post = await postRepository.save({ name: 'Intégrateur', department: department });
      }

      let fileRepository = dataSource.getRepository(File);
      let file = await fileRepository.findOneBy({ name: 'hairun_simple_user' });
      if (!file) {
        file = await fileRepository.save({
          name: 'hairun_simple_user',
          path: 'hairun_simple_user',
          public_id: 'id_simple_user',
          size: 160,
          type: 'png',
        });
      }

      const password = await hashPassword('SimpleUser@2024*');

      await userRepository.save({
        firstname: 'hairun si user',
        lastname: 'hairun si user',
        birth_date: new Date(),
        email: 'test-simple-user@hairun-technology.com',
        password: password,
        post: post,
        image: file,
      });
      logger.info('Employee added successfully one time into the app');
    }

    let departmentRepository = dataSource.getRepository(Department);
    const _departmentAnonyme = await departmentRepository.findOne({ where: { name: 'Anonyme' } });
    if (!_departmentAnonyme) {
      let roleRepository = dataSource.getRepository(Role);
      const role = await roleRepository.findOne({ where: { name: 'Employé' } });
      let department = new Department();
      department.name = 'Anonyme';
      department.role = role;
      await departmentRepository.save(department);
      logger.info('Department anonymous added successfully one time into the app');
    }
  }
}
