import { Migration } from '@mikro-orm/migrations';

export class Migration20250621104210 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" rename column "username" to "email";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" rename column "email" to "username";`);
  }

}
