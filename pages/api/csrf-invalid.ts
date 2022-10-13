import type { NextApiRequest, NextApiResponse } from 'next';

import { FORBIDDEN } from '../../utils/statusCodes';

type Data = {
  status: string;
  code: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(FORBIDDEN).send({ status: 'Invalid csrf token', code: FORBIDDEN });
}
