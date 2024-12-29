export const baseUrl = "http://localhost:3000/api/cards";

export const getAllCards = async (): Promise<Array<Card> | undefined> => {
	try {
		const response = await fetch(baseUrl, { method: "GET" });
		const cards = await response.json();

		return cards;
	} catch (error) {
		console.error(error);
	}
};

export const postAllCards = async (updates: Array<Card>): Promise<{ status: string } | undefined> => {
	try {
		const response = await fetch(baseUrl, {
			method: "POST",
			body: JSON.stringify(updates),
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};

export const getCard = async (cardType: Card["type"]): Promise<Card | undefined> => {
	try {
		const response = await fetch(`${baseUrl}?type=${cardType}`, { method: "GET" });
		const card = await response.json();

		return card;
	} catch (error) {
		console.error(error);
	}
};

export const postCard = async (card: Card): Promise<{ status: string } | undefined> => {
	try {
		const response = await fetch(baseUrl, {
			method: "POST",
			body: JSON.stringify(card),
			headers: { "content-type": "application/json" },
		});
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteCard = async (cardType: Card["type"]): Promise<{ status: string } | undefined> => {
	try {
		const response = await fetch(`${baseUrl}?type=${cardType}`, { method: "DELETE" });
		const data = await response.json();

		return data;
	} catch (error) {
		console.error(error);
	}
};
