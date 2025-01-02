import { sendAlertQueue } from '@/utils/job';
import { printInfo } from '@/utils/logger';
import { NextResponse } from 'next/server';

export const POST = async () => {
	const message = `Manual: Your current time is ${new Date()}`;

	await sendAlertQueue.add({ text: message });

	printInfo({ message });

	return NextResponse.json({ success: true });
};
