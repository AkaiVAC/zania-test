import { getAllCards } from "@/api";
import { cardInFocusAtom, cardsAtom } from "@/atoms";
import { cardStorageKey } from "@/lib/constants";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export default () => {
	const setCards = useSetAtom(cardsAtom);
	const setCardInFocus = useSetAtom(cardInFocusAtom);

	const fetchDocuments = async () => {
		const data = await getAllCards();
		const cachedCards = JSON.parse(localStorage.getItem(cardStorageKey) ?? "[]");

		if (data?.length) {
			const sortedCards = data.toSorted((a, b) => a.position - b.position);
			localStorage.setItem(cardStorageKey, JSON.stringify(sortedCards));
			setCards(sortedCards);
		} else {
			setCards(cachedCards);
		}
	};

	const closeOverlayOnEscape = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setCardInFocus(undefined);
		}
	};

	useEffect(() => {
		fetchDocuments();

		document.addEventListener("keydown", closeOverlayOnEscape);
		return () => {
			document.removeEventListener("keydown", closeOverlayOnEscape);
		};
	}, []);
};
