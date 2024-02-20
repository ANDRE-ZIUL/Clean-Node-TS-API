import { MongoClient } from 'mongodb'
const MONGO_URL = 'mongodb://localhost:27017/jest'
export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(MONGO_URL)
  },

  async disconnect () {
    await this.client.close()
  }
}
