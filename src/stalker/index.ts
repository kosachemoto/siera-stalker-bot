import { CronJob } from 'cron';

import { Scraper } from '../scraper';
import { Observer } from '../observer';
import { ObserverCallback } from '../observer/types';

import { CRON_TIME, DEVIATION_RANGE } from '../common/env';

export class Stalker<T extends ObserverCallback> {
    private cronJob: CronJob;

    private scraper: Scraper;
    private observer: Observer<T>;

    private static generateDelay() {
        return Math.round(Math.random() * DEVIATION_RANGE);
    }

    private static scheduleEvent(callback: () => void) {
        setTimeout(callback, Stalker.generateDelay());
    }

    private onTick = () => {
        this.scraper
            .scrape()
            .then((data) => {
                this.observer.publish(data);
            })
            .catch((err) => {
                console.log('Something wrong:', err);
            });
    };

    constructor(scraper: Scraper, observer: Observer<T>) {
        this.scraper = scraper;
        this.observer = observer;

        this.cronJob = new CronJob(
            CRON_TIME,
            () => {
                Stalker.scheduleEvent(this.onTick);
            },
            undefined,
            undefined,
            'Europe/Moscow'
        );
    }

    start() {
        this.cronJob.start();
    }

    stop() {
        this.cronJob.stop();
    }
}
