import { MigrationInterface, QueryRunner } from 'typeorm';

export class FriendRequests1683382490611 implements MigrationInterface {
  name = 'FriendRequests1683382490611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "friend-requests" ("id" SERIAL NOT NULL, "creatorId" integer, "receiverId" integer, CONSTRAINT "PK_8bc3b3b23f74e7c66c40c0efa75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "friend-requests" ADD CONSTRAINT "FK_d9848757631d310dc85bcc7fda3" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "friend-requests" ADD CONSTRAINT "FK_445647f96e12f1ce25d064927b7" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "friend-requests" DROP CONSTRAINT "FK_445647f96e12f1ce25d064927b7"`);
    await queryRunner.query(`ALTER TABLE "friend-requests" DROP CONSTRAINT "FK_d9848757631d310dc85bcc7fda3"`);
    await queryRunner.query(`DROP TABLE "friend-requests"`);
  }
}
