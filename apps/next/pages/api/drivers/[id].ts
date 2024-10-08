import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "app/lib/dbConnect";
import Driver from "app/models/Driver";

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
        const driver = await Driver.findById(id);
        if (!driver) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: driver });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" :
      try {
        const driver = await Driver.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!driver) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: driver });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" :
      try {
        const deletedDriver = await Driver.deleteOne({ _id: id });
        if (!deletedDriver) {
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
