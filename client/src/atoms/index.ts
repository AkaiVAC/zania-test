import { atom } from "jotai";

export const activeCardAtom = atom<Card["type"] | undefined>(undefined);
export const cardsAtom = atom<Array<Card>>([]);
export const autoSaveAtom = atom<boolean>(false);
export const autoSaveProgressAtom = atom<boolean>(false);
export const cardInFocusAtom = atom<string | undefined>(undefined);

export const cardTypesAtom = atom((get) => {
	const cards = get(cardsAtom);
	return cards.map((card) => card.type);
});
