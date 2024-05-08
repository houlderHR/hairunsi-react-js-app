import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class UserRole1713475156317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'id_role');
  }
}
