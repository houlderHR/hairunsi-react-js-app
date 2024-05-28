import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class RemoveRoleOnUser1714472018860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'id_role');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'id_role',
        type: 'uuid',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['id_role'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
      }),
    );
  }
}
