import type { NextApiRequest, NextApiResponse } from 'next';
import { withSwagger } from 'next-swagger-doc';

import packageJson from '../../package.json';
import { NOT_FOUND } from '../../utils/statusCodes';

const { version } = packageJson;

const productionHandler = (req: NextApiRequest, res: NextApiResponse<{ status: string; code: number }>) => {
  res.status(NOT_FOUND).send({ status: 'Endpoint not found', code: NOT_FOUND });
};

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NEAR Onfido API',
      version,
    },
  },
  apiFolder: 'pages/api',
});

export default process.env.NODE_ENV === 'production' ? productionHandler : swaggerHandler();
