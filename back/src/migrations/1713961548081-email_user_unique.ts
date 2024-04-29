import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class EmailUserUnique1713961548081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD CONSTRAINT email_user_unique UNIQUE (email);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP CONSTRAINT email_user_unique;');
  }
}
