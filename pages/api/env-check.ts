import { env } from "../../src/env";
import type  { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    SINGLESTORE_HOST: env.SINGLESTORE_HOST,
    SINGLESTORE_PORT: env.SINGLESTORE_PORT,
    SINGLESTORE_USER: env.SINGLESTORE_USER,
    SINGLESTORE_PASSWORD: env.SINGLESTORE_PASSWORD ? "******" : null,
    SINGLESTORE_DATABASE: env.SINGLESTORE_DATABASE,
  });
}
