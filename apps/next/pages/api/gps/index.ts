import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "app/lib/dbConnect";
import Gp from "app/models/Gp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const gps = await Gp.find({});
        res.status(200).json({ success: true, data: gps });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const gp = await Gp.create(
          req.body,
        );
        res.status(201).json({ success: true, data: gp });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
