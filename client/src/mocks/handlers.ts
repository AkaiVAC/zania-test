import { baseUrl } from "@/api";
import cardJson from "@/assets/cards.json";
import { cardStorageKey } from "@/lib/constants";
import { http, HttpResponse } from "msw";

export const handlers = [
	http.get(baseUrl, async () => {
		const storedDocuments = JSON.parse(localStorage.getItem(cardStorageKey) || "[]");

		return HttpResponse.json<Array<Card>>(storedDocuments.length ? storedDocuments : cardJson);
	}),
	http.post(baseUrl, async (context) => {
		const updatedList = await context.request.json();
		localStorage.setItem(cardStorageKey, JSON.stringify(updatedList));

		return HttpResponse.json({
			status: "success - browser mock",
		});
	}),
];
