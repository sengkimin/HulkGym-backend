import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740045191460 implements MigrationInterface {
    name = 'Default1740045191460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" ADD "image" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promotion" DROP COLUMN "image"`);
    }

}
