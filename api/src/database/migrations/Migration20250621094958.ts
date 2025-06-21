import { Migration } from '@mikro-orm/migrations';

export class Migration20250621094958 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "box" ("id" serial primary key, "identifier" varchar(255) not null, "latitude" real not null, "longitude" real not null);`);

    this.addSql(`create table "package" ("id" serial primary key, "code" varchar(255) not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);`);
  }

}
