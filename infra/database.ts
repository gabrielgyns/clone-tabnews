import { Client, type QueryResult } from "pg";

async function query(
  queryObject: string | { text: string; values: string[] },
): Promise<QueryResult> {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT ?? 5432),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production", // CA -> SSL values https://github.com/filipedeschamps/clone-tabnews/commit/57ea2e5521526cdc55fa33d1cd5ad1cb19be5920
  });

  try {
    await client.connect();

    const result = await client.query(queryObject);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default { query };
