
const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  NEXT_PUBLIC_STORAGE_ID: STORAGE_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const sdk = require('node-appwrite')

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);