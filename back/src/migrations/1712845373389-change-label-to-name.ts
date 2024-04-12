import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLabelToName1712845373389 implements MigrationInterface {
    name = 'ChangeLabelToName1712845373389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" RENAME COLUMN "label" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" RENAME COLUMN "name" TO "label"`);
    }

}
