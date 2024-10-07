import { sendEmail } from '@/utils/mail';

export const sendScheduledAlert = async () => {
	await sendEmail(`Schedule: Your current time is ${new Date()}`);
};
