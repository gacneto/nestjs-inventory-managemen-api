import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInventoryMovementsTable1759751111305 implements MigrationInterface {
    name = 'CreateInventoryMovementsTable1759751111305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."inventory_movements_type_enum" AS ENUM('entrada', 'saída')`);
        await queryRunner.query(`CREATE TABLE "inventory_movements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "user_id" uuid NOT NULL, "type" "public"."inventory_movements_type_enum" NOT NULL, "quantity" integer NOT NULL, "quantityBefore" integer NOT NULL, "quantityAfter" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7597827c1dcffae889db3ab873" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" ADD CONSTRAINT "FK_5c3bec1682252c36fa161587738" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" ADD CONSTRAINT "FK_63cca4adcd28b6fe19bc4ceb22f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_movements" DROP CONSTRAINT "FK_63cca4adcd28b6fe19bc4ceb22f"`);
        await queryRunner.query(`ALTER TABLE "inventory_movements" DROP CONSTRAINT "FK_5c3bec1682252c36fa161587738"`);
        await queryRunner.query(`DROP TABLE "inventory_movements"`);
        await queryRunner.query(`DROP TYPE "public"."inventory_movements_type_enum"`);
    }

}
