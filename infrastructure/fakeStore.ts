import { ISaveableRecord, IStore } from "./collection";

export default class FakeStore implements IStore {
  constructor(
    private documents: ISaveableRecord[] = []
  ) {}

  async get(id: string) {
    const document = this.documents.find(d => d._id == id) || null;
    if (document) {
      return this.serialize(document);
    }
    return null;
  }

  async replace(record: ISaveableRecord) {
    const index = this.documents.findIndex(d => d._id == record._id);
    if (index === -1) {
      return;
    }

    this.documents[index] = this.serialize(record);
  }

  async insert(record: ISaveableRecord | Omit<ISaveableRecord, "_id">) {
    const index = this.documents.findIndex(d => d._id == record._id);
    if (index !== -1) {
      throw new Error('Document already exists');
    }

    const toInsert = this.serializeWithId(record);

    this.documents.push(toInsert);

    return toInsert._id;
  }
  private serializeWithId(record: ISaveableRecord | Pick<ISaveableRecord, "_id">): ISaveableRecord {
    return { _id: `~~id:${this.documents.length}~~`, ...this.serialize(record) }
  }

  private serialize<T>(record: T): T {
    return JSON.parse(JSON.stringify(record));
  }
}