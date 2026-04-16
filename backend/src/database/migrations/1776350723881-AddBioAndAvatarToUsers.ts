import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBioAndAvatarToUsers1776350723881 implements MigrationInterface {
    name = 'AddBioAndAvatarToUsers1776350723881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "bio" text`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
    }

}
