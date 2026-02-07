import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';

export const useCurrentTime = (): Dayjs => {
	const [currentTime, setCurrentTime] = useState<Dayjs>(() => dayjs());

	useEffect(() => {
		let intervalId: ReturnType<typeof setInterval> | undefined;

		const syncToMinute = () => {
			setCurrentTime(dayjs());
			intervalId = setInterval(() => {
				setCurrentTime(dayjs());
			}, 60_000);
		};

		const now = dayjs();
		// Align updates to the next minute boundary to avoid drift.
		const msToNextMinute =
			60_000 - (now.second() * 1000 + now.millisecond());
		const timeoutId = setTimeout(syncToMinute, msToNextMinute);

		return () => {
			clearTimeout(timeoutId);
			if (intervalId) clearInterval(intervalId);
		};
	}, []);

	return currentTime;
};
