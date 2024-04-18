import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export class UserFile1713475156318 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'id_file',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['id_file'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'id_file');
    await queryRunner.dropUniqueConstraint('files', new TableUnique({ columnNames: ['id_file'] }));
  }
}
