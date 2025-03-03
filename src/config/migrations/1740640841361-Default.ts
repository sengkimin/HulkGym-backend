import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740640841361 implements MigrationInterface {
    name = 'Default1740640841361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "image" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "image"`);
    }

}
