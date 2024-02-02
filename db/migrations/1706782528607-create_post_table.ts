import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1706782528607 implements MigrationInterface {
    name = 'CreatePostTable1706782528607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "userId" uuid, CONSTRAINT "PK_619da6a8941888b2ef891312293" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "url" character varying NOT NULL, "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "filename" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_81bb889c2f894d8496b916b7f0d" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
