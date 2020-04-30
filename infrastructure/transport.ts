type TransportableType<T> = {
  new (_id: string, props: any): T;
};

export default class Transport {
  constructor(
    private transportableTypes: { [typeId: string]: TransportableType<any> }
  ) { }
  private readonly typeIdKey = '~t';
  private readonly itemIdKey = '_id';

  parse(item: any) {
    if (typeof item !== 'object' || item == null) {
      return item;
    }
    
    const typeId = this.typeIdKey in item ? item[this.typeIdKey] : null;
    const itemId = this.itemIdKey in item ? item[this.itemIdKey] : null;
    if (typeId && itemId && this.transportableTypes[typeId]) {
      return new (this.transportableTypes[typeId])(itemId, item);
    }
    return item;
  }

  serialize(item: any) {
    if (typeof item !== 'object' || item == null) {
      return item;
    }

    const expectedType = 'constructor' in item ? item.constructor : null;
    const itemId = '_id' in item ? item._id : null;
    if (expectedType && itemId) {
      const typeId = this.findTypeId(expectedType);
      return { [this.itemIdKey]: typeId, _id: itemId, ...item }
    }
    return item;
  }

  findTypeId(expectedType: { new(...args: any): any }) {
    for (const typeId in this.transportableTypes) {
      if (this.transportableTypes.hasOwnProperty(typeId)) {
        const type = this.transportableTypes[typeId];
        if (type === expectedType) {
          return typeId;
        }
      }
    }
  }
}