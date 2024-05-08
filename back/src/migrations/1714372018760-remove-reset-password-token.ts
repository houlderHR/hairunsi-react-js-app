import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class RemoveResetPasswordToken1714372018760 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'reset_password_token');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'reset_password_token',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
