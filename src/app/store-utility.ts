export class StoreUtility {
  static normalize(entityArray: Entity[]) {
    return entityArray.reduce((previousValue, currentValue) => {
      return {...previousValue, ...{[currentValue.id]: currentValue}};
    }, {});
  }

  static unNormalized(entities: { [id: number]: any }) {
    if (!entities) {
      return [];
    } else {
      // @ts-ignore
      return Object.keys(entities).map(key => entities[key]);
    }
  }

  static filterDuplicateIds(ids: number[]) {
    return ids.filter((elem, index, self) => index === self.indexOf(elem));
  }

  static removeKey(entities: { [id: number]: any }, id: any) {
    const newObj = {...entities};
    delete newObj[id];
    return newObj;
  }
}

interface Entity {
  id: any;
}
