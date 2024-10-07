import { sendAlertQueue } from '@/utils/job';
import { NextResponse } from 'next/server';

export const POST = async () => {
	await sendAlertQueue.add({
		text: `Manual: Your current time is ${new Date()}`,
	});
	return NextResponse.json({ success: true });
};
