import Queue from 'bull';
import cron from 'node-cron';

import { sendScheduledAlert } from './schedule';
import { sendManualAlert } from './queue';

const redisConnection = process.env.REDIS_CONNECTION as string;
export const sendAlertQueue = new Queue('alert', redisConnection, {
	defaultJobOptions: {
		removeOnComplete: true,
		removeOnFail: true,
		timeout: 5 * 60 * 1000,
	},
});

if (require.main === module) {
	cron.schedule('* * * * *', () => {
		sendScheduledAlert();
	});

	sendAlertQueue.process(sendManualAlert);
}
