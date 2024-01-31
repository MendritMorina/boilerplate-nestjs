import { MigrationInterface, QueryRunner } from "typeorm";

export class SetDefaultNullRefreshTokenInUserTable1706692016708 implements MigrationInterface {
    name = 'SetDefaultNullRefreshTokenInUserTable1706692016708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

}
