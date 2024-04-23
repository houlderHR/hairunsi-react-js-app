import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordToUser1713851474180 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ADD "email" varchar(255) NOT NULL DEFAULT \'example@hairun-technology.com\';',
    );
    await queryRunner.query('ALTER TABLE "users" ADD "password" varchar(255)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP "email";');
    await queryRunner.query('ALTER TABLE "users" DROP "password";');
  }
}
