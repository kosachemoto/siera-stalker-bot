import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

export class DataStorage<T> {
    static fileName: string = './previous-response-data.json';

    private value?: Promise<T | undefined>;

    constructor() {
        this.value = readFile(DataStorage.fileName, {
            flag: 'a+',
        })
            .then<T>((data) => {
                return JSON.parse(data.toString());
            })
            .catch(() => undefined);
    }

    async get() {
        return readFile(DataStorage.fileName, {
            flag: 'a+',
        })
            .then<T>((data) => {
                return JSON.parse(data.toString());
            })
            .catch(() => undefined);
    }

    async set(value: T) {
        this.value = writeFile(DataStorage.fileName, JSON.stringify(value))
            .then(() => value)
            .catch(() => this.value);

        return this.value;
    }
}
