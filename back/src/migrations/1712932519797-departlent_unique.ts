import { MigrationInterface, QueryRunner } from "typeorm";

export class DepartlentUnique1712932519797 implements MigrationInterface {
    name = 'DepartlentUnique1712932519797'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Department" ADD CONSTRAINT "UQ_21805d78d1ab310eb8fe9a59b7b" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Department" DROP CONSTRAINT "UQ_21805d78d1ab310eb8fe9a59b7b"`);
    }

}
