import { IndexerApi, WrapConfiguration } from './types';
import axios from 'axios';

export function createIndexerApi(url: string): IndexerApi {
  const client = axios.create({
    baseURL: `${url}/v1`,
  });

  return {
    async getConfiguration(): Promise<WrapConfiguration> {
      const { data } = await client.get('/configuration');

      return data;
    },
  };
}
