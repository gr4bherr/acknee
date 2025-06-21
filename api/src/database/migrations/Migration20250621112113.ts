import { Migration } from '@mikro-orm/migrations';

export class Migration20250621112113 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "box" drop column "latitude", drop column "longitude";`);

    this.addSql(`alter table "box" add column "geom" geography(POINT, 4326) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "box" drop column "geom";`);

    this.addSql(`alter table "box" add column "latitude" float4 not null, add column "longitude" float4 not null;`);
  }

}
