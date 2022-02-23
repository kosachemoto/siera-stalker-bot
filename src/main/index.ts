import { Scraper } from '../scraper';
import { Observer } from '../observer';
import { Stalker } from '../stalker';
import { BotWare } from '../bot-ware';
import { DataStorage } from '../data-storage';
import { ProductDiff } from '../products-diff';

import { ProductItem } from '../common/types';

type Callback = (data: ProductItem[]) => void;

export class Main {
    private scraper: Scraper;
    private observer: Observer<Callback>;
    private dataStorage: DataStorage<ProductItem[]>;
    private stalker: Stalker<Callback>;
    private botWare: BotWare;

    constructor() {
        this.scraper = new Scraper();
        this.observer = new Observer();

        this.dataStorage = new DataStorage();
        this.stalker = new Stalker(this.scraper, this.observer);
        this.botWare = new BotWare();

        this.observer.subscribe((data) => {
            this.dataStorage
                .get()
                .then((previousData) => {
                    const productDiff = new ProductDiff(previousData, data);
                    this.botWare.sendRecord(productDiff);
                    this.dataStorage.set(data);
                })
                .catch((err) => {
                    console.log('Something wrong:', err);
                });
        });
    }

    start() {
        this.stalker.start();
    }

    stop() {
        this.stalker.stop();
    }
}
