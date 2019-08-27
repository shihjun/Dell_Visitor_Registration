import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeRegistrationTable1566809828922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_5cf271a50a3ddb6a81fb49adc2d"`);
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "REL_5cf271a50a3ddb6a81fb49adc2"`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_5cf271a50a3ddb6a81fb49adc2d" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "registrations" DROP CONSTRAINT "FK_5cf271a50a3ddb6a81fb49adc2d"`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "REL_5cf271a50a3ddb6a81fb49adc2" UNIQUE ("request_id")`);
        await queryRunner.query(`ALTER TABLE "registrations" ADD CONSTRAINT "FK_5cf271a50a3ddb6a81fb49adc2d" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
