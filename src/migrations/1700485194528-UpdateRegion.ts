import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRegion1700485194528 implements MigrationInterface {
    name = 'UpdateRegion1700485194528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" ADD "codeRegion" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "codeRegion"`);
    }

}
