import { MigrationInterface, QueryRunner } from "typeorm";

export class addtablecolumn1563517132304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`EXEC sp_rename "users.phone", "extension"`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "primary_contact_phone" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "requests" ADD "alternative_contact_phone" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_596fafe47a8d83f79e7f66132bc"`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "car_plate" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "alternative_contact_id" int`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "updated_at" datetime`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_aeccdec4ba67641afe2ad33e8c7"`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "checkout_at" datetime`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "belongings" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "updated_at" datetime`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "updated_by" int`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_596fafe47a8d83f79e7f66132bc" FOREIGN KEY ("alternative_contact_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_aeccdec4ba67641afe2ad33e8c7" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_aeccdec4ba67641afe2ad33e8c7"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP CONSTRAINT "FK_596fafe47a8d83f79e7f66132bc"`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "updated_by" int`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "updated_at" datetime`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "belongings" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "registrations" ALTER COLUMN "checkout_at" datetime`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_aeccdec4ba67641afe2ad33e8c7" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "updated_at" datetime`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "alternative_contact_id" int`);
        await queryRunner.query(`ALTER TABLE "requests" ALTER COLUMN "car_plate" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "requests" ADD CONSTRAINT "FK_596fafe47a8d83f79e7f66132bc" FOREIGN KEY ("alternative_contact_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "alternative_contact_phone"`);
        await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "primary_contact_phone"`);
        await queryRunner.query(`EXEC sp_rename "users.extension", "phone"`);
    }

}
