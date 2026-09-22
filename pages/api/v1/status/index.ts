import database from "infra/database";
import type { NextApiRequest, NextApiResponse } from "next";

export type StatusResponse = {
  updated_at: string;
  dependencies: {
    database: {
      version: string;
      max_connections: number;
      opened_connections: string;
    };
  };
};

async function status(
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const updatedAt = new Date().toISOString();

  const postgresVersion = (await database.query("SHOW server_version;")).rows[0]
    .server_version;

  const postgresMaxConnections = (await database.query("SHOW max_connections;"))
    .rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const postgresOpenedConnections = (
    await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    })
  ).rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersion,
        max_connections: parseInt(postgresMaxConnections, 10),
        opened_connections: postgresOpenedConnections,
      },
    },
  } as StatusResponse);
}

export default status;
