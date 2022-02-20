import scrapeIt from 'scrape-it';
import cn from 'classnames';

import {
    SIVERA_SLEEPING_BAG_CATALOG_URL,
    MAIN_CATALOG_SELECTOR,
    PRODUCT_ITEM_SELECTOR,
    TITLE_SELECTOR,
    PRICE_SELECTOR,
} from '../common/consts';
import { ProductItem } from '../common/types';

export class Scraper {
    private url: string;
    private options: scrapeIt.ScrapeOptions;

    constructor() {
        this.url = SIVERA_SLEEPING_BAG_CATALOG_URL;
        this.options = {
            items: {
                listItem: cn(MAIN_CATALOG_SELECTOR, PRODUCT_ITEM_SELECTOR),
                data: {
                    title: TITLE_SELECTOR,
                    price: PRICE_SELECTOR,
                }
            },
        };
    }

    async scrape(): Promise<ProductItem[]> {
        return scrapeIt<ProductItem[]>(this.url, this.options).then(({ data, response }) => {
            if (response.statusCode !== 200) {
                throw new Error(`Status: ${response.statusCode}`);
            }

            return data;
        }).catch((err) => {
            console.log('Что-то пошло не так:', err);
            return [];
        })
    }
}