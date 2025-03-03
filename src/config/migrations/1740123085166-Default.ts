import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740123085166 implements MigrationInterface {
    name = 'Default1740123085166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_plan" ("id" SERIAL NOT NULL, "workout_plan_name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "types_of_workout" ("id" SERIAL NOT NULL, "workout_type" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "workout_plan_id" integer, CONSTRAINT "PK_3d7b81741ee1ac1e9700b40a470" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise" ("id" SERIAL NOT NULL, "exercise_name" character varying(255) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "workout_type_id" integer, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD CONSTRAINT "FK_b5a2e625d65756d57d18fa96329" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_7646dd0b3670c226b5f91fc3851" FOREIGN KEY ("workout_type_id") REFERENCES "types_of_workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_7646dd0b3670c226b5f91fc3851"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP CONSTRAINT "FK_b5a2e625d65756d57d18fa96329"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
        await queryRunner.query(`DROP TABLE "types_of_workout"`);
        await queryRunner.query(`DROP TABLE "workout_plan"`);
    }

}
