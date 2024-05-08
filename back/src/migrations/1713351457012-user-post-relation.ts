import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class UserPostRelation1713351457012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'id_post',
        type: 'uuid',
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['id_post'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'id_post');
  }
}
