// lib/dbMssql.ts
import sql from "mssql";

const config = {
  user: process.env.DB_USER || "NextJS",
  password: process.env.DB_PASSWORD || "{SQLNextjs02/07/23}",
  server: process.env.DB_SERVER || "192.168.0.10",
  port: parseInt(process.env.DB_PORT || "1433"),
  database: process.env.DB_NAME || "Colegio_Militarizado_05",
  options: {
    encrypt: true,
    trustServerCertificate: true,
    connectionTimeout: 30000,
    requestTimeout: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (pool) {
    // Si ya existe una conexión, la retornamos
    console.log("Conexión existente a SQL Server reutilizada");
    return pool;
  }

  try {
    pool = await sql.connect(config);
    console.log("Conexión a SQL Server establecida");
    return pool;
  } catch (error) {
    console.error("Error al conectar con SQL Server:", error);
    pool = null; // Limpieza en caso de fallo
    throw error;
  }
}
