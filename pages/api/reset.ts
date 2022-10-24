// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import differenceInDays from "date-fns/differenceInDays";
import type { NextApiRequest, NextApiResponse } from "next";
import { dbClient } from "../../db/client";

type Data = {
  daysSinceLastFire: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return;

  const created_at = new Date().toISOString();
  const { error } = await dbClient.from("days").insert({ created_at });

  const daysSinceLastFire = differenceInDays(new Date(), new Date(created_at));
  console.debug("$$$", created_at, error);
  if (error) {
    res.status(400);
  }

  res.status(200).json({ daysSinceLastFire });
}
