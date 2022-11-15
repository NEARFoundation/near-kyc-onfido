import type { NextApiRequest, NextApiResponse } from 'next';

import packageJson from '../../package.json';
import { SUCCESS } from '../../utils/statusCodes';

/**
 * @swagger
 * /api/version:
 *   get:
 *     description: Returns the app version number
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<{ version: string }>) {
  const { version } = packageJson;
  res.status(SUCCESS).send({ version });
}
