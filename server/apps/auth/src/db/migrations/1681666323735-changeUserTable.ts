import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserTable1681666323735 implements MigrationInterface {
  name = 'ChangeUserTable1681666323735';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "first_name" TO "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "first_name"`);
  }
}
