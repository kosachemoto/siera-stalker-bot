import { Bot } from 'grammy';

import { ProductDiff } from '../products-diff';

import { BOT_TOKEN, CHAT_ID } from '../common/env';

export class BotWare {
    private token = BOT_TOKEN;
    private chatId = CHAT_ID;

    private bot: Bot;

    constructor() {
        this.bot = new Bot(this.token);
    }

    private formatDiff(productDiff: ProductDiff) {
        const removed = productDiff.removed();
        const added = productDiff.added();
        const merged = productDiff.merged();

        try {
            const result = [
                removed.length
                    ? `*Убыло:*\n${removed
                          .map(({ title, price }) => `\`${title}\n${price}\`\n`)
                          .join('')}`
                    : '',
                added.length
                    ? `*Прибыло:*\n${added
                          .map(({ title, price }) => `\`${title}\n${price}\`\n`)
                          .join('')}`
                    : '',
                merged.length
                    ? `*Поменялось:*\n${merged
                          .map(
                              ({ oldItem, newItem }) =>
                                  `\`${oldItem.title}\n${oldItem.price} > ${newItem.price}\`\n`
                          )
                          .join('')}`
                    : '',
            ]
                .filter((section) => section)
                .join('\n')
                .replace(/-/gm, '\\-')
                .replace(/>/gm, '\\>');

            if (!result) {
                return 'Ничего не поменялось';
            }

            return result;
        } catch (err) {
            console.log('Something wrong:', err);
            return '🔥 Ошибка форматирования данных';
        }
    }

    sendRecord(productDiff: ProductDiff) {
        const kek = this.formatDiff(productDiff);
        console.log('# kek:', kek);
        this.bot.api.sendMessage(this.chatId, kek, {
            parse_mode: 'MarkdownV2',
        });
    }

    start() {
        this.bot.start();
    }

    stop() {
        this.bot.stop();
    }
}
