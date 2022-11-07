// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Handlers } from "$fresh/server.ts";

import { dbClient } from "../../db/client.ts";

export const handler: Handlers = {
  async POST() {
    const created_at = new Date().toISOString();
    const { error } = await dbClient.from("days").insert({ created_at });
    if (error) {
      return new Response(JSON.stringify({ statusCode: 400 }));
    }

    return new Response(JSON.stringify({ daysSinceLastFire: 0 }), {
      status: 301,
      headers: {
        "content-type": "application/json",
        Location: "/",
      },
    });
  },
};
