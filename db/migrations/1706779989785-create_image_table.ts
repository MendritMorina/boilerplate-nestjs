import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImageTable1706779989785 implements MigrationInterface {
    name = 'CreateImageTable1706779989785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "url" character varying NOT NULL, "name" character varying NOT NULL, "mimeType" character varying NOT NULL, "filename" character varying NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_86e1090f01d1ebc6613bddf228a" PRIMARY KEY ("Id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
