import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user) {
    if (req.method === "GET") {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          nickname: true,
          image: true,
          friendsTo: true,
        },
      });

      res.status(200).json({
        ok: true,
        users,
      });
    }
  } else {
    res.status(403).json({
      ok: false,
    });
  }
}
