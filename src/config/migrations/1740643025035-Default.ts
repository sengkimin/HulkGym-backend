import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740643025035 implements MigrationInterface {
    name = 'Default1740643025035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "image" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "image"`);
    }

}
