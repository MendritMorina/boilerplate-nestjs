import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedThumbnailAtTablePost1706861890830 implements MigrationInterface {
    name = 'AddedThumbnailAtTablePost1706861890830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "thumbnailId" uuid`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_811133313cbb602fa85ff90b43a" FOREIGN KEY ("thumbnailId") REFERENCES "images"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_811133313cbb602fa85ff90b43a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "thumbnailId"`);
    }

}
