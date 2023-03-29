import { createObjects } from './index';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';

let client: WeaviateClient;

beforeAll(async () => {
  if (process.platform !== 'linux') {
    throw new Error('EmbeddedDB only supports Linux at the moment.');
  }
  client = weaviate.client({
    scheme: 'http',
    host: 'localhost:6666',  // TODO: remove after https://github.com/weaviate/typescript-client/issues/25
    embedded: new weaviate.EmbeddedOptions({
      port: 6666,
    }),
  });

  console.log('Weaviate binary:', client.embedded?.options.binaryPath);
  console.log('Data path:', client.embedded?.options.persistenceDataPath);

  await client.embedded?.start();
  console.info('\nEmbedded DB started\n');
});

describe('objects', () => {
  beforeAll(async () => {
    try {
      await client.schema.classDeleter().withClassName('Wine').do();
    } catch {
      // Ignore error if class doesn't exist
    }

  });

  test('create and fetch objects', async () => {
    console.info('Creating objects');
    await createObjects(client, 3);
    console.info('Fetching objects...');
    const response = await client.data.getter().do();
    expect(response.objects).toHaveLength(3);
  });
});

afterAll(async () => {
  console.info('\nStopping...');
  await client.embedded?.stop();
  console.info('Exiting...');
});
