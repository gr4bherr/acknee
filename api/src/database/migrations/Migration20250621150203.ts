import { Migration } from '@mikro-orm/migrations';

export class Migration20250621150203 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create type "user_role" as enum ('supplier', 'customer');`);
    this.addSql(`create table "order" ("id" serial primary key, "user_id" int not null, "package_id" int null);`);
    this.addSql(`alter table "order" add constraint "order_package_id_unique" unique ("package_id");`);

    this.addSql(`alter table "order" add constraint "order_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "order" add constraint "order_package_id_foreign" foreign key ("package_id") references "package" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "box" alter column "geom" type geography(POINT, 4326) using ("geom"::geography(POINT, 4326));`);

    this.addSql(`alter table "user" add column "role" "user_role" not null default 'supplier';`);

    this.addSql(`alter table "package" add column "order_id" int not null;`);
    this.addSql(`alter table "package" add constraint "package_order_id_foreign" foreign key ("order_id") references "order" ("id") on update cascade;`);
    this.addSql(`alter table "package" add constraint "package_order_id_unique" unique ("order_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "package" drop constraint "package_order_id_foreign";`);

    this.addSql(`drop table if exists "order" cascade;`);

    this.addSql(`alter table "box" alter column "geom" type geography using ("geom"::geography);`);

    this.addSql(`alter table "package" drop constraint "package_order_id_unique";`);
    this.addSql(`alter table "package" drop column "order_id";`);

    this.addSql(`alter table "user" drop column "role";`);

    this.addSql(`drop type "user_role";`);
  }

}
