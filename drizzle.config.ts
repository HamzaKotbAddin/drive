import { type Config, defineConfig } from "drizzle-kit";

import { env } from "~/env";

export default defineConfig({
    dialect: "singlestore",
    schema: "./src/server/db/schema.ts",
    tablesFilter: ["drive_"],
    dbCredentials: {
        host: env.SINGLESTORE_HOST,
        user: env.SINGLESTORE_USER,
        password: env.SINGLESTORE_PASSWORD,
        port: Number(env.SINGLESTORE_PORT),
        database: env.SINGLESTORE_DATABASE,
        ssl: {},
    },
});


