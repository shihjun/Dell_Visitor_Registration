import {MigrationInterface, QueryRunner} from "typeorm";

export class changedatetimetype1564820075588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "badge_id" character varying NOT NULL, "department" character varying NOT NULL, "extension" character varying NOT NULL, "email" character varying NOT NULL, "isSecurity" boolean NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "requests" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "ic" character varying NOT NULL, "phone" character varying NOT NULL, "car_plate" character varying NOT NULL, "visit_from" TIMESTAMP NOT NULL, "visit_to" TIMESTAMP NOT NULL, "purpose" character varying NOT NULL, "department" character varying NOT NULL, "status" character varying NOT NULL, "primary_contact_id" integer NOT NULL, "primary_contact_phone" character varying NOT NULL, "alternative_contact_id" integer NOT NULL, "alternative_contact_phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "created_by" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registrations" ("id" SERIAL NOT NULL, "request_id" integer NOT NULL, "checkin_at" TIMESTAMP NOT NULL, "checkout_at" TIMESTAMP NOT NULL, "checkin_by" integer NOT NULL, "escort_by" integer NOT NULL, "belongings" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "created_by" integer NOT NULL, "updated_at" TIMESTAMP NOT NULL, "updated_by" integer NOT NULL, CONSTRAINT "REL_5cf271a50a3ddb6a81fb49adc2" UNIQUE ("request_id"), CONSTRAINT "PK_6013e724d7b22929da9cd7282d1" PRIMARY KEY ("id"))`);
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
        await queryRunner.query(`DROP TABLE "registrations"`);
        await queryRunner.query(`DROP TABLE "requests"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
