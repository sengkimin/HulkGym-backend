import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1739379224130 implements MigrationInterface {
    name = 'Default1739379224130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" ADD "image" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "image"`);
    }

}
