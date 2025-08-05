// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { int, text  } from "drizzle-orm/mysql-core";
import { singlestoreTable } from "drizzle-orm/singlestore-core";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const users = singlestoreTable("users_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});