export interface DatabasePort<TDocument extends { _id: string }> {
  get(id: string): Promise<TDocument | null>;
  replace(document: TDocument): Promise<void>;
  insert(document: TDocument | Omit<TDocument, "_id">): Promise<string>;

  getOrCreate(id: string): Promise<TDocument>;
  insertOrReplace(document: TDocument): Promise<void>;
}
