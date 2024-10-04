import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "app/lib/dbConnect";
import Gp from "app/models/Gp";

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
        const gp = await Gp.findById(id);
        if (!gp) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: gp });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" :
      try {
        const gp = await Gp.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!gp) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: gp });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" :
      try {
        const deletedGp = await Gp.deleteOne({ _id: id });
        if (!deletedGp) {
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
