import { Collection, ISaveableRecord } from "../../infrastructure/collection";
export class Profile {
  constructor(
    public _id: string,
    fields: any
  ) {
    Object.assign(this, fields);
  }
}
export default class ProfileCollection extends Collection<Profile> {
  createEmpty(id: string) {
    return new Profile(id, {});
  }
  parseFromRecord(record: ISaveableRecord) {
    return new Profile(record._id, record);
  }
}