import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration21582078232030 implements MigrationInterface {
    name = 'migration21582078232030';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE `users` DROP COLUMN `password`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `users` ADD `password` varchar(500) NOT NULL',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `users` DROP COLUMN `description`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `users` ADD `description` varchar(1500) NOT NULL',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE `users` DROP COLUMN `description`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `users` ADD `description` varchar(255) NOT NULL',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `users` DROP COLUMN `password`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `users` ADD `password` varchar(255) NOT NULL',
            undefined,
        );
    }
}
