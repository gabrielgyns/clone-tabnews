test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  console.log(responseBody);

  expect(response.status).toBe(200);

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.database.max_connections).toEqual("100");
  expect(responseBody.database.connections_used).toBeGreaterThan(0);
});
