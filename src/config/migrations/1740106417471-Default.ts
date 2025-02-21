import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740106417471 implements MigrationInterface {
    name = 'Default1740106417471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" ADD "email" character varying(30) NOT NULL`);
    }

}
