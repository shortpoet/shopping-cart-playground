import {MigrationInterface, QueryRunner} from "typeorm";

export class initDatabase1607718694426 implements MigrationInterface {
    name = 'initDatabase1607718694426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logistics"."purchases" ("id" int NOT NULL IDENTITY(1,1), "product_id" int NOT NULL, "transaction_id" int NOT NULL, "quantity" int NOT NULL, CONSTRAINT "PK_96e5fc007e8bc1296714b3f8c99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logistics"."transactions" ("id" int NOT NULL IDENTITY(1,1), "customer_id" int NOT NULL, "total" int NOT NULL, "rewards_points" int NOT NULL, CONSTRAINT "PK_19142db7a0a8f5ff8c0632b240f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vcc"."admin_users" ("id" int NOT NULL IDENTITY(1,1), "first_name" nvarchar(255) NOT NULL, "last_name" nvarchar(255) NOT NULL, CONSTRAINT "PK_8bb59f06139cd491f5feb7ff374" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logistics"."products" ("id" int NOT NULL IDENTITY(1,1), "product_name" nvarchar(255) NOT NULL, "cost" int NOT NULL, CONSTRAINT "UQ_8cf2eda08be1f6b9ce8edd8eeea" UNIQUE ("product_name"), CONSTRAINT "PK_5d328b7b9b25982bfe1e7c2b80a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "logistics"."purchases" ADD CONSTRAINT "FK_265508889c822b07ca1205a0969" FOREIGN KEY ("transaction_id") REFERENCES "logistics"."transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistics"."purchases" DROP CONSTRAINT "FK_265508889c822b07ca1205a0969"`);
        await queryRunner.query(`DROP TABLE "logistics"."products"`);
        await queryRunner.query(`DROP TABLE "vcc"."admin_users"`);
        await queryRunner.query(`DROP TABLE "logistics"."transactions"`);
        await queryRunner.query(`DROP TABLE "logistics"."purchases"`);
    }

}
