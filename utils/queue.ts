import { sendEmail } from '@/utils/mail';
import { Job } from 'bull';

export const sendManualAlert = async ({
	data: { text },
}: Job<{ text: string }>) => {
	await sendEmail(text);
};
