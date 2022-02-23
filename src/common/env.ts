import 'dotenv/config';

type Env = {
    BOT_TOKEN: string;
    CHAT_ID: string;
    CRON_TIME: string;
    DEVIATION_RANGE: number;
};

export const { BOT_TOKEN, CHAT_ID, CRON_TIME, DEVIATION_RANGE }: Env = {
    BOT_TOKEN: process.env.BOT_TOKEN || '',
    CHAT_ID: process.env.CHAT_ID || '',
    CRON_TIME: process.env.CRON_TIME || '',
    DEVIATION_RANGE: Number(process.env.CRON_TIME || '0'),
};
