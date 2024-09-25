import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "app/lib/dbConnect";
import Player from "app/models/Drivers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" :
      try {
        const player = await Player.findById(id);
        if (!player) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" :
      try {
        const player = await Player.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!player) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: player });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" :
      try {
        const deletedPlayer = await Player.deleteOne({ _id: id });
        if (!deletedPlayer) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
