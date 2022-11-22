import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  key: string;
}

export default IParams;
