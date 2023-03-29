# Embedded Weaviate test

Simple Node.js project to test "embedded DB" - the feature to automatically download the Weaviate server Linux binary when constructing the Weaviate client object.

The test script creates a number of objects using [Auto-schema](https://weaviate.io/developers/weaviate/configuration/schema-configuration#auto-schema), then fetches all of them, verifying that the same number of objects was returned.
