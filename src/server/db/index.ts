// app.ts
                
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/singlestore";

const pool = mysql.createPool("singlestore://hamza-b321c:y6dao%5B4k4I31hw%25Ygwek_c9@svc-3482219c-a389-4079-b18b-d50662524e8a-shared-dml.aws-virginia-6.svc.singlestore.com:3333/Drive_DB?ssl={}");
export const db = drizzle({ client: pool });