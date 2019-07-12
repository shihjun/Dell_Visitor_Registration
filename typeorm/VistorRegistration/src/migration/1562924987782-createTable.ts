import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1562924987782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "badge_id" nvarchar(255) NOT NULL, "department" nvarchar(255) NOT NULL, "phone" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "isSecurity" bit NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "ic" nvarchar(255) NOT NULL, "phone" nvarchar(255) NOT NULL, "car_plate" nvarchar(255) NOT NULL, "visit_from" datetime NOT NULL, "visit_to" datetime NOT NULL, "purpose" nvarchar(255) NOT NULL, "department" nvarchar(255) NOT NULL, "status" nvarchar(255) NOT NULL, "primary_contact_id" int NOT NULL, "alternative_contact_id" int NOT NULL, "created_at" datetime NOT NULL, "created_by" int NOT NULL, "updated_at" datetime NOT NULL, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registrations" ("id" int NOT NULL IDENTITY(1,1), "request_id" int NOT NULL, "checkin_at" datetime NOT NULL, "checkout_at" datetime NOT NULL, "checkin_by" int NOT NULL, "escort_by" int NOT NULL, "belongings" nvarchar(255) NOT NULL, "created_at" datetime NOT NULL, "created_by" int NOT NULL, "updated_at" datetime NOT NULL, "updated_by" int NOT NULL, CONSTRAINT "PK_6013e724d7b22929da9cd7282d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_5cf271a50a3ddb6a81fb49adc2" ON "registrations" ("request_id") WHERE "request_id" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_0c7a9d591a1dd7b2bf4df26d5ea" FOREIGN KEY ("primary_contact_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_596fafe47a8d83f79e7f66132bc" FOREIGN KEY ("alternative_contact_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_2d487b151e34f5924c3d8adb5da" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_5cf271a50a3ddb6a81fb49adc2d" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_300a96eacffedd85432a83488a8" FOREIGN KEY ("checkin_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_7866a1026b45ae89c2e420ee390" FOREIGN KEY ("escort_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_8185d1c36bdb1cb1f95db13e6f3" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_aeccdec4ba67641afe2ad33e8c7" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_aeccdec4ba67641afe2ad33e8c7"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_8185d1c36bdb1cb1f95db13e6f3"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_7866a1026b45ae89c2e420ee390"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_300a96eacffedd85432a83488a8"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_5cf271a50a3ddb6a81fb49adc2d"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_2d487b151e34f5924c3d8adb5da"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_596fafe47a8d83f79e7f66132bc"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_0c7a9d591a1dd7b2bf4df26d5ea"`);
        await queryRunner.query(`DROP INDEX "REL_5cf271a50a3ddb6a81fb49adc2" ON "registrations"`);
        await queryRunner.query(`DROP TABLE "registrations"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
