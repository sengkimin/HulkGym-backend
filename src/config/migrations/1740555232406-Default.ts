import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1740555232406 implements MigrationInterface {
    name = 'Default1740555232406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP CONSTRAINT "FK_b5a2e625d65756d57d18fa96329"`);
        await queryRunner.query(`ALTER TABLE "workout_plan" DROP CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c"`);
        await queryRunner.query(`ALTER TABLE "workout_plan" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "workout_plan" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "workout_plan" ADD CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_7646dd0b3670c226b5f91fc3851"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP CONSTRAINT "PK_3d7b81741ee1ac1e9700b40a470"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD CONSTRAINT "PK_3d7b81741ee1ac1e9700b40a470" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP COLUMN "workout_plan_id"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD "workout_plan_id" uuid`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "workout_type_id"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "workout_type_id" uuid`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD CONSTRAINT "FK_b5a2e625d65756d57d18fa96329" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_7646dd0b3670c226b5f91fc3851" FOREIGN KEY ("workout_type_id") REFERENCES "types_of_workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_7646dd0b3670c226b5f91fc3851"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP CONSTRAINT "FK_b5a2e625d65756d57d18fa96329"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "workout_type_id"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "workout_type_id" integer`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP COLUMN "workout_plan_id"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD "workout_plan_id" integer`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP CONSTRAINT "PK_3d7b81741ee1ac1e9700b40a470"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD CONSTRAINT "PK_3d7b81741ee1ac1e9700b40a470" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_7646dd0b3670c226b5f91fc3851" FOREIGN KEY ("workout_type_id") REFERENCES "types_of_workout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_plan" DROP CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c"`);
        await queryRunner.query(`ALTER TABLE "workout_plan" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "workout_plan" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout_plan" ADD CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "types_of_workout" ADD CONSTRAINT "FK_b5a2e625d65756d57d18fa96329" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
