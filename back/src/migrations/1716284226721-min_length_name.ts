import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class MinLengthName1716284226721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE roles ADD CONSTRAINT check_min_length_role CHECK (length(name) >= 4), ADD CONSTRAINT name_role_unique UNIQUE (name);',
    );
    await queryRunner.query(
      'ALTER TABLE departments ADD CONSTRAINT check_min_length_department CHECK (length(name) >= 4), ADD CONSTRAINT name_department_unique UNIQUE (name);',
    );
    await queryRunner.query(
      'ALTER TABLE permissions ADD CONSTRAINT check_min_length_permission CHECK (length(name) >= 4), ADD CONSTRAINT name_permission_unique UNIQUE (name);',
    );
    await queryRunner.query(
      'ALTER TABLE posts ADD CONSTRAINT check_min_length_post CHECK (length(name) >= 4), ADD CONSTRAINT name_post_unique UNIQUE (name);',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE roles DROP CONSTRAINT check_min_length_role, DROP CONSTRAINT name_role_unique;',
    );
    await queryRunner.query(
      'ALTER TABLE departments DROP CONSTRAINT check_min_length_department, DROP CONSTRAINT name_department_unique;',
    );
    await queryRunner.query(
      'ALTER TABLE permissions DROP CONSTRAINT check_min_length_permission, DROP CONSTRAINT name_permission_unique;',
    );
    await queryRunner.query(
      'ALTER TABLE posts DROP CONSTRAINT check_min_length_post, DROP CONSTRAINT name_post_unique;',
    );
  }
}
