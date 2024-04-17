import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class PostDepartment1713342827793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'id_department',
        type: 'uuid',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'posts',
      new TableForeignKey({
        columnNames: ['id_department'],
        referencedColumnNames: ['id'],
        referencedTableName: 'departments',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'id_department');
  }
}
