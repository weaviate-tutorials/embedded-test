import { WeaviateClient } from 'weaviate-ts-client';

export async function createObjects(client: WeaviateClient, count: number) {
  // Create objects with autoschema
  for (let wineIdx = 1; wineIdx <= count; wineIdx++)
    await client.data
      .creator()
      .withClassName('Wine')
      .withProperties({
        name: 'Pinot ' + 2020 + wineIdx,
        description: 'More or less aged wine',
      })
      .do();
}
