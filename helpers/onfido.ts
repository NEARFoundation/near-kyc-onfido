import { Onfido, Region } from '@onfido/api';

const apiToken = process.env.SDK_TOKEN_FACTORY_SECRET ?? '';
const region = Region.EU; // Supports Region.EU, Region.US and Region.CA

export default function getOnfido() {
  const onfido = new Onfido({
    apiToken,
    region,
  });
  return onfido;
}
