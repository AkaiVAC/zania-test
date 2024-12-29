import { activeCardAtom, cardInFocusAtom } from "@/atoms";
import { useSortable } from "@dnd-kit/sortable";
import { useAtom, useAtomValue } from "jotai";
import type { CSSProperties } from "react";

type CardProps = {
	card: Card;
	floating?: boolean;
};

const Card = (props: CardProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.card.type });
	const [cardInFocus, setCardInFocus] = useAtom(cardInFocusAtom);
	const activeCard = useAtomValue(activeCardAtom);

	const style: CSSProperties = {
		opacity: !props.floating && activeCard === props.card.type ? "0" : "inherit",
		transform: transform as unknown as CSSProperties["transform"],
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={!cardInFocus ? () => setCardInFocus(props.card.type) : undefined}
			className={props.card.type === cardInFocus ? "expand" : ""}
		>
			<h2>{props.card.title}</h2>
			<img src={`https://picsum.photos/id/${props.card.position}/200`} width={200} height={200} alt='' />
			<p>{props.card.type}</p>
		</li>
	);
};

export default Card;
