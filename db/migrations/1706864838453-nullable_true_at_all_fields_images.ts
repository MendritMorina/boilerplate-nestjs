import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableTrueAtAllFieldsImages1706864838453 implements MigrationInterface {
    name = 'NullableTrueAtAllFieldsImages1706864838453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "mimeType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "filename" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "size" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "size" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "filename" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "mimeType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "url" SET NOT NULL`);
    }

}
