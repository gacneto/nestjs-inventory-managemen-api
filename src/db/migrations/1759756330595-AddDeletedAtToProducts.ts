import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtToProducts1759756330595 implements MigrationInterface {
    name = 'AddDeletedAtToProducts1759756330595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "deleted_at"`);
    }

}
