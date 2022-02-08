import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUsersAndTasksTables1644320701996 implements MigrationInterface {
    name = 'AddedUsersAndTasksTables1644320701996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "UQ_396d500ff7f1b82771ddd812fd1" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "email" varchar NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "UQ_396d500ff7f1b82771ddd812fd1" UNIQUE ("name"), CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "name", "description", "isActive", "isDeleted", "createdAt", "updatedAt", "userId") SELECT "id", "name", "description", "isActive", "isDeleted", "createdAt", "updatedAt", "userId" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT (1), "isDeleted" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "UQ_396d500ff7f1b82771ddd812fd1" UNIQUE ("name"))`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "name", "description", "isActive", "isDeleted", "createdAt", "updatedAt", "userId") SELECT "id", "name", "description", "isActive", "isDeleted", "createdAt", "updatedAt", "userId" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
