import { withSwagger } from 'next-swagger-doc';

import packageJson from '../../package.json';

const { version } = packageJson;

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

export default swaggerHandler();
