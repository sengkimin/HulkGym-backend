import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740020088708 implements MigrationInterface {
    name = 'Default1740020088708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exercise_name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "workout_plan"`);
    }

}
