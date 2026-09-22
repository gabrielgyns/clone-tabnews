import database from "infra/database";
import type { NextApiRequest, NextApiResponse } from "next";

async function status(
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const updatedAt = new Date().toISOString();
  const postgresVersion = (await database.query("SHOW server_version;")).rows[0]
    .server_version;
  const postgresMaxConnections = (await database.query("SHOW max_connections;"))
    .rows[0].max_connections;
  const postgresConnectionsUsed = (
    await database.query("SELECT count(*)::int FROM pg_stat_activity")
  ).rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    database: {
      version: postgresVersion,
      max_connections: postgresMaxConnections,
      connections_used: postgresConnectionsUsed,
    },
  });
}

export default status;
