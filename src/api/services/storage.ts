import fs from "fs";
import path from "path";

export enum DataTypeEnum {
  Account,
  ApiKey,
}

export interface IStorageItem {
  key: string;
  value: any;
}

export interface IStorageService {
  seed: () => void;
  getByKey: (type: DataTypeEnum, key: string) => IStorageItem | null;
  getAll: (type: DataTypeEnum) => { [key: string]: IStorageItem };
  save: (type: DataTypeEnum, data: IStorageItem) => void;
}

export default class Storage implements IStorageService {
  private tryReadJsonFile(filePath: string): { [key: string]: any } {
    let fileContent = "{}";
    if (fs.existsSync(filePath)) {
      fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    }
    return JSON.parse(fileContent);
  }

  private trySaveJsonFile(filePath: string, obj: any) {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2));
  }

  private getFilePath(type: DataTypeEnum) {
    let fileName = "unknown.json";

    switch (type) {
      case DataTypeEnum.ApiKey:
        fileName = "api-key.json";
        break;
      case DataTypeEnum.Account:
        fileName = "account.json";
        break;
    }

    const f = __dirname;

    return `${__dirname}/../../../app-data/${fileName}`;
  }

  public getByKey(type: DataTypeEnum, key: string) {
    const data = this.tryReadJsonFile(this.getFilePath(type));
    const value = data[key];
    if (value) {
      const result: IStorageItem = {
        key: key,
        value: value,
      };
      return result;
    }
    return null;
  }

  public getAll(type: DataTypeEnum) {
    const data = this.tryReadJsonFile(this.getFilePath(type));
    return data;
  }

  public save(type: DataTypeEnum, data: IStorageItem) {
    const all = this.getAll(type);
    all[data.key] = data.value;
    this.trySaveJsonFile(this.getFilePath(type), all);
  }

  public seed() {
    let testAccount = this.getByKey(DataTypeEnum.Account, "test-account-01");
    if (!testAccount) {
      testAccount = {
        key: "test-account-01",
        value: {
          name: "Test Account - 01",
        },
      };
      this.save(DataTypeEnum.Account, testAccount);
    }

    let testApiKey = this.getByKey(DataTypeEnum.ApiKey, "test-key-1");
    if (!testApiKey) {
      testApiKey = {
        key: "test-key-1",
        value: {
          accountId: testAccount.key,
        },
      };
      this.save(DataTypeEnum.ApiKey, testApiKey);
    }
  }
}
