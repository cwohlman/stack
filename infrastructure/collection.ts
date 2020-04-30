export interface ISaveableRecord { _id: string, [key: string]: unknown }
export interface IStore {
  get(id: string): Promise<ISaveableRecord | null>;
  replace(document: ISaveableRecord): Promise<void>;
  insert(document: ISaveableRecord | Omit<ISaveableRecord, "_id">): Promise<string>;

}
export abstract class Collection<TDocument extends { _id: string }> {
  constructor(
    private store: IStore
  ) {}

  abstract createEmpty(id: string): TDocument
  abstract parseFromRecord(record: ISaveableRecord): TDocument | null
  serializeToRecord(document: TDocument): ISaveableRecord {
    return document;
  }
  async get(id: string) {
    const record = await this.store.get(id);
    const document = this.parseFromRecord(record);

    // TODO: handle broken records;

    return document;
  }
  async replace(document: TDocument) {
    const record = this.serializeToRecord(document);

    return await this.store.replace(record);
  }
  async insert(document: TDocument) {
    const record = this.serializeToRecord(document);

    return await this.store.insert(record);
  }
  async getOrCreate(id: string): Promise<TDocument> {
    const existing = await this.get(id);

    if (existing) {
      return existing;
    }

    return this.createEmpty(id);
  }
  async insertOrReplace(document: TDocument): Promise<void> {
    if (await this.store.get(document._id)) {
      await this.store.replace(document);
    } else {
      await this.store.insert(document);
    }
  }
}
