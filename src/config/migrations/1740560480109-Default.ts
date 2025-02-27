import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740560480109 implements MigrationInterface {
    name = 'Default1740560480109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership_plan" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "membership_plan" ADD "price" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "membership_plan" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "membership_plan" ADD "price" numeric`);
    }

}
