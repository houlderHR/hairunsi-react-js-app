import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationTables1712904784441 implements MigrationInterface {
    name = 'RelationTables1712904784441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_2db7d829a31533bd913ef432dc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "File" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "path" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_b287aa0a177c20740f3d917e38f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "registration_number" character varying(255) NOT NULL, "firstname" character varying(255) NOT NULL, "lastname" character varying(255) NOT NULL, "birthday" TIMESTAMP NOT NULL, "jobId" uuid, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Job" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "departmentId" uuid, CONSTRAINT "PK_981d90e7185b9ec1ee6b814ec21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role_Job" ("jobId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_d108f8fd788f6b4e68bc19f1bcb" PRIMARY KEY ("jobId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e730792253ddf4cfab16862c45" ON "Role_Job" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_84c99a01d4cffaa141bbf77cdc" ON "Role_Job" ("roleId") `);
        await queryRunner.query(`CREATE TABLE "Permission_Role" ("roleId" uuid NOT NULL, "permissionId" uuid NOT NULL, CONSTRAINT "PK_2eb72fea2109ebe00f13bf37860" PRIMARY KEY ("roleId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d258d5986c0d78eefdc01e894e" ON "Permission_Role" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a7860274aac1ea43296a5622b" ON "Permission_Role" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_f22b680200ab0f3419769acf1cf" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Job" ADD CONSTRAINT "FK_c7aeb21caef2a787d74cf01ca76" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Role_Job" ADD CONSTRAINT "FK_e730792253ddf4cfab16862c45c" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Role_Job" ADD CONSTRAINT "FK_84c99a01d4cffaa141bbf77cdc3" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Permission_Role" ADD CONSTRAINT "FK_d258d5986c0d78eefdc01e894e4" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Permission_Role" ADD CONSTRAINT "FK_3a7860274aac1ea43296a5622ba" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Permission_Role" DROP CONSTRAINT "FK_3a7860274aac1ea43296a5622ba"`);
        await queryRunner.query(`ALTER TABLE "Permission_Role" DROP CONSTRAINT "FK_d258d5986c0d78eefdc01e894e4"`);
        await queryRunner.query(`ALTER TABLE "Role_Job" DROP CONSTRAINT "FK_84c99a01d4cffaa141bbf77cdc3"`);
        await queryRunner.query(`ALTER TABLE "Role_Job" DROP CONSTRAINT "FK_e730792253ddf4cfab16862c45c"`);
        await queryRunner.query(`ALTER TABLE "Job" DROP CONSTRAINT "FK_c7aeb21caef2a787d74cf01ca76"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_f22b680200ab0f3419769acf1cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a7860274aac1ea43296a5622b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d258d5986c0d78eefdc01e894e"`);
        await queryRunner.query(`DROP TABLE "Permission_Role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84c99a01d4cffaa141bbf77cdc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e730792253ddf4cfab16862c45"`);
        await queryRunner.query(`DROP TABLE "Role_Job"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "Job"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "File"`);
        await queryRunner.query(`DROP TABLE "Department"`);
    }

}
