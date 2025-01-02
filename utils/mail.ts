import { createTransport } from 'nodemailer';
import { logInfo } from '@/utils/logger';

export const sendEmail = async (text: string) => {
	const transporter = createTransport({
		host: 'mail',
		port: 1025,
		secure: false,
	});

	await transporter.sendMail({
		from: 'no-reply@test.example',
		to: 'receiver@test.example',
		subject: 'Alert',
		text,
	});

	logInfo({ message: `Email sent at ${new Date()}` });
};
