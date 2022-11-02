import type { NextApiRequest, NextApiResponse } from 'next';

import packageJson from '../../package.json';
import { SUCCESS } from '../../utils/statusCodes';

export default function handler(req: NextApiRequest, res: NextApiResponse<{ version: string }>) {
  const { version } = packageJson;
  res.status(SUCCESS).send({ version });
}
