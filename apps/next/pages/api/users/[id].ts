import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "app/lib/dbConnect";
import User from "app/models/User";

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
        case "GET":
            try {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
