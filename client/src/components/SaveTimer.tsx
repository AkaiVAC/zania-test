import { autoSaveProgressAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

const SaveTimer = () => {
	const autoSaveInProgress = useAtomValue(autoSaveProgressAtom);

	const [time, setTime] = useState(0);
	useEffect(() => {
		if (autoSaveInProgress) {
			setTime(0);
			return;
		}
		const timer = setInterval(() => {
			setTime((prev) => prev + 1);
		}, 1000);
		return () => {
			if (timer) clearInterval(timer);
		};
	}, [autoSaveInProgress]);

	if (autoSaveInProgress) return <code className='saving'>Saving...</code>;

	return (
		<code>
			Time since last save: {time} second{time !== 1 ? "s" : ""}
		</code>
	);
};

export default SaveTimer;
