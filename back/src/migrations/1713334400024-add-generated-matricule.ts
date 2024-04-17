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
    await queryRunner.query('ALTER TABLE USERS DROP COLUMN IF EXISTS MATRICULE CASCADE');
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "matricule" varchar GENERATED ALWAYS AS (CASE WHEN LENGTH(id::text) >= 4 THEN ('M' || SUBSTRING(('00' || id) from '.{LENGTH(id::text)}$')) ELSE ('M' || SUBSTRING(('00' || id) from '.{3}$')) END) STORED NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE USERS ADD COLUMN IF NOT EXISTS MATRICULE CASCADE');
    await queryRunner.query('ALTER TABLE USERS DROP COLUMN id CASCADE');
    await queryRunner.changeColumn(
      'users',
      'uuid',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      }),
    );
  }
}
