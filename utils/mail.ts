import { createTransport } from 'nodemailer';

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
};
