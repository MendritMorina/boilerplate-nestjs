import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldAtTableUser1706625457472 implements MigrationInterface {
    name = 'AddNewFieldAtTableUser1706625457472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
    }

}
