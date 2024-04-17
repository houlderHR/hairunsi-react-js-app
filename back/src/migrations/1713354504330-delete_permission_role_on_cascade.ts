import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DeletePermissionRoleOnCascade1713354504330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permission_role');
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(
      new Table({
        name: 'permission_role',
        columns: [
          {
            name: 'id_permission',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_role',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['id_permission'],
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['id_role'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey('permission_role', ['id_role', 'id_permission']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('permission_role');
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(
      new Table({
        name: 'permission_role',
        columns: [
          {
            name: 'id_permission',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'id_role',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'NOW()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['id_permission'],
            referencedTableName: 'permissions',
            referencedColumnNames: ['id'],
          },
          {
            columnNames: ['id_role'],
            referencedTableName: 'roles',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );

    await queryRunner.createPrimaryKey('permission_role', ['id_role', 'id_permission']);
  }
}
