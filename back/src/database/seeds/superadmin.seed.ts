import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Department } from '../../entities/department.entity';
import { Post } from '../../entities/post.entity';
import { Permission } from '../../entities/permission.entity';
import { Role } from '../../entities/role.entity';
import { User } from '../../entities/user.entity';
import { hashPassword } from '../../utils/hash';
import { File } from '../../entities/file.entity';
import logger from '../../utils/logger';

export default class SuperAdminSeed implements Seeder {
  track = false;

  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    let userRepository = dataSource.getRepository(User);
    let user: User = await userRepository.findOneBy({ email: 'test@hairun-technology.com' });
    if (!user) {
      let permissionRepository = dataSource.getRepository(Permission);
      let [
        permissionUtilisateur,
        permissionCreateUser,
        permissionUpdateUser,
        permissionDeleteUser,
      ] = [
        await permissionRepository.findOneBy({ name: 'Accès tout utilisateur' }),
        await permissionRepository.findOneBy({ name: 'Création tout utilisateur' }),
        await permissionRepository.findOneBy({ name: 'Modification tout utilisateur' }),
        await permissionRepository.findOneBy({ name: 'Suppression tout utilisateur' }),
      ];
      if (!permissionUtilisateur) {
        permissionUtilisateur = await permissionRepository.save({ name: 'Accès tout utilisateur' });
      }
      if (!permissionCreateUser) {
        permissionCreateUser = await permissionRepository.save({
          name: 'Création tout utilisateur',
        });
      }
      if (!permissionUpdateUser) {
        permissionUpdateUser = await permissionRepository.save({
          name: 'Modification tout utilisateur',
        });
      }
      if (!permissionDeleteUser) {
        permissionDeleteUser = await permissionRepository.save({
          name: 'Suppression tout utilisateur',
        });
      }

      let roleRepository = dataSource.getRepository(Role);
      let role = await roleRepository.findOneBy({ name: 'Super admin' });
      if (!role) {
        role = await roleRepository.save({
          name: 'Super admin',
          permissions: [
            permissionUtilisateur,
            permissionCreateUser,
            permissionUpdateUser,
            permissionDeleteUser,
          ],
        });
      }

      const repository = dataSource.getRepository(Department);
      let department = await repository.findOneBy({ name: 'Direction' });
      if (!department) {
        department = await repository.save({ name: 'Direction', role: role });
      }

      let postRepository = dataSource.getRepository(Post);
      let post = await postRepository.findOneBy({ name: 'Directeur' });
      if (!post) {
        post = await postRepository.save({ name: 'Directeur', department: department });
      }

      let fileRepository = dataSource.getRepository(File);
      let file = await fileRepository.findOneBy({ name: 'hairun_admin' });
      if (!file) {
        file = await fileRepository.save({
          name: 'hairun_admin',
          path: 'hairun',
          public_id: '123456',
          size: 160,
          type: 'png',
        });
      }

      const password = await hashPassword('hairunM@2024*');

      await userRepository.save({
        firstname: 'hairun',
        lastname: 'hairun',
        birth_date: new Date(),
        email: 'test@hairun-technology.com',
        password: password,
        post: post,
        image: file,
      });
      logger.info('Super admin added successfully one time into the app');
    }
  }
}
