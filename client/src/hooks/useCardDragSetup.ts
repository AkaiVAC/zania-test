import { activeCardAtom, autoSaveAtom, cardInFocusAtom, cardsAtom } from "@/atoms";
import {
	type DragEndEvent,
	type DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

export default () => {
	const [cards, setCards] = useAtom(cardsAtom);
	const cardInFocus = useAtomValue(cardInFocusAtom);
	const setActiveCard = useSetAtom(activeCardAtom);
	const setAutoSave = useSetAtom(autoSaveAtom);

	const dragSensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { delay: 500, distance: 0 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		if (cardInFocus === active.id) return;

		setActiveCard(active.id as Card["type"]);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (cardInFocus === active.id) return;

		if (!over) return;

		if (active.id !== over.id) {
			setCards((items) => {
				const oldIndex = cards.findIndex((card) => card.type === active.id);
				const newIndex = cards.findIndex((card) => card.type === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}

		setActiveCard(undefined);
		setAutoSave(true);
	};

	return {
		dragSensors,
		handleDragStart,
		handleDragEnd,
	};
};
