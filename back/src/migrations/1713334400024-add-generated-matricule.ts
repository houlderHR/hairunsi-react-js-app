import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddGeneratedMatricule1713334400024 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'uuid',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      }),
    );

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
    await queryRunner.query('ALTER TABLE USERS DROP COLUMN MATRICULE CASCADE');
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "matricule" varchar GENERATED ALWAYS AS ('M' || SUBSTRING(('00' || id) from '.{3}$')) STORED NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
