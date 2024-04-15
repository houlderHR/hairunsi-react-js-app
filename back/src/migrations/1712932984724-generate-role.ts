import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateRole1712932984724 implements MigrationInterface {
    name = 'GenerateRole1712932984724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Role" ADD CONSTRAINT "UQ_b852abd9e268a63287bc815aab6" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Role" DROP CONSTRAINT "UQ_b852abd9e268a63287bc815aab6"`);
    }

}
