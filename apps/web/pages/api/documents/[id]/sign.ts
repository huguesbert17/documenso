import {
  defaultHandler,
  defaultResponder,
  getUserFromToken,
} from "@documenso/lib/server";
import prisma from "@documenso/prisma";
import { NextApiRequest, NextApiResponse } from "next";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const existingUser = await getUserFromToken(req, res);
  const { id: documentId } = req.query;
  const { token: recipientToken } = req.query;

  if (!documentId) {
    res.status(400).send("Missing parameter documentId.");
    return;
  }

  let document = await prisma.document.findFirst({
    where: {
      id: +documentId,
    },
  });

  if (!document)
    res.status(404).end(`No document with id ${documentId} found.`);

  const recipients = prisma.recipient.findMany({
    where: { documentId: +documentId },
  });

  // todo sign stuff

  return res.status(200).end();
}

export default defaultHandler({
  POST: Promise.resolve({ default: defaultResponder(postHandler) }),
});
