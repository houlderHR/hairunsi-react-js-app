import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class PermissionNameNotNullable1713278812585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE permissions;');
    await queryRunner.changeColumn(
      'permissions',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'permissions',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '255',
        isUnique: true,
        isNullable: true,
      }),
    );
  }
}
