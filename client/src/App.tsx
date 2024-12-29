import { closestCenter, DndContext, DragOverlay } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

import { useAtomValue } from "jotai";
import { activeCardAtom, cardInFocusAtom, cardsAtom, cardTypesAtom } from "./atoms";
import { Card, SaveTimer } from "./components";
import { useCardDragSetup, useCardPageSetup, useCardPositionAutoSave } from "./hooks";

const App = () => {
	useCardPageSetup();
	const { dragSensors, handleDragStart, handleDragEnd } = useCardDragSetup();
	useCardPositionAutoSave();

	const cards = useAtomValue(cardsAtom);
	const activeCard = useAtomValue(activeCardAtom);
	const cardInFocus = useAtomValue(cardInFocusAtom);
	const cardTypes = useAtomValue(cardTypesAtom);

	return (
		<section>
			<header>
				<h1>Draggable cards</h1>
				<p>Drag to rearrange. Click to expand.</p>
				<SaveTimer />
			</header>

			<ul>
				{!cards.length && <li>No cards found.</li>}
				<DndContext
					sensors={dragSensors}
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				>
					<SortableContext items={cardTypes} strategy={rectSortingStrategy} disabled={Boolean(cardInFocus)}>
						{cards.map((card) => (
							<Card key={card.type} card={card} />
						))}
					</SortableContext>
					<DragOverlay>
						{activeCard ? <Card card={cards.find((card) => card.type === activeCard)!} floating /> : null}
					</DragOverlay>
				</DndContext>
			</ul>
		</section>
	);
};

export default App;
