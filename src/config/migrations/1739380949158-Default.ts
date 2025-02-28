import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1739380949158 implements MigrationInterface {
    name = 'Default1739380949158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_876085341242e41592b0e6b15e0"`);
        await queryRunner.query(`CREATE TABLE "workout_plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exercise_name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aea7bdb578979ab3fd974331f5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "branch_id" uuid, "phone_number" character varying(30) NOT NULL, "email" character varying(30) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "promotion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text NOT NULL, "discount_percentage" numeric(5,2) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_876085341242e41592b0e6b15e0" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_876085341242e41592b0e6b15e0"`);
        await queryRunner.query(`DROP TABLE "promotion"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "workout_plan"`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_876085341242e41592b0e6b15e0" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
