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

    connectionTimeout: 30000, // 30 segundos
    requestTimeout: 30000, // 30 segundos
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  },
};
let pool: sql.ConnectionPool;

async function getPool() {
  if (!pool) {
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log("Conneccion inicializada");
  }
  return pool;
}

export async function executeRequest(
  operation: "query" | "procedure",
  command: string,
  inputs?: { [key: string]: { type: any; value: any } },
  outputs?: { [key: string]: any }
) {
  const pool = await getPool();
  const request = pool.request();

  // Agregar parámetros de entrada
  if (inputs) {
    for (const [key, param] of Object.entries(inputs)) {
      request.input(key, param.type, param.value);
    }
  }

  // Agregar parámetros de salida
  if (outputs) {
    for (const [key, type] of Object.entries(outputs)) {
      request.output(key, type);
    }
  }

  try {
    if (operation === "procedure") {
      return await request.execute(command);
    } else {
      return await request.query(command);
    }
  } catch (error) {
    console.error("Database error:", {
      operation,
      command,
      error,
    });
    throw error;
  }
}

// Inicialización del pool
getPool().catch((err) => {
  console.error("Failed to initialize database pool:", err);
});
