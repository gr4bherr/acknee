import { Migration } from '@mikro-orm/migrations';

export class Migration20250621151902 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "box" alter column "geom" type geography(POINT, 4326) using ("geom"::geography(POINT, 4326));`);

    this.addSql(`alter table "user" alter column "role" type "user_role" using ("role"::"user_role");`);
    this.addSql(`alter table "user" alter column "role" set default 'customer';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "box" alter column "geom" type geography using ("geom"::geography);`);

    this.addSql(`alter table "user" alter column "role" type "user_role" using ("role"::"user_role");`);
    this.addSql(`alter table "user" alter column "role" set default 'supplier';`);
  }

}
