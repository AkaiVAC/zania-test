import { postAllCards } from "@/api";
import { autoSaveAtom, autoSaveProgressAtom, cardsAtom } from "@/atoms";
import { cardStorageKey } from "@/lib/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export default () => {
	const [autoSave, setAutoSave] = useAtom(autoSaveAtom);
	const setAutoSaveProgress = useSetAtom(autoSaveProgressAtom);
	const cards = useAtomValue(cardsAtom);

	const saveCardPositionUpdates = () => {
		if (!autoSave) return;
		setAutoSaveProgress(() => true);
		setTimeout(() => {
			const updatedCards = cards.map((card, index) => ({ ...card, position: index }));
			postAllCards(updatedCards).then(() => {
				localStorage.setItem(cardStorageKey, JSON.stringify(updatedCards));
				setAutoSaveProgress(() => false);
			});
		}, 2000);
		setAutoSave(false);
	};

	useEffect(() => {
		const timer = setInterval(saveCardPositionUpdates, 5000);

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [autoSave]);
};
