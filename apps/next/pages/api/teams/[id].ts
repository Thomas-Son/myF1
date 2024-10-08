import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "app/lib/dbConnect";
import Team from "app/models/Team";

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
        const team = await Team.findById(id);
        if (!team) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: team });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" :
      try {
        const team = await Team.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!team) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: team });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" :
      try {
        const deletedTeam = await Team.deleteOne({ _id: id });
        if (!deletedTeam) {
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
