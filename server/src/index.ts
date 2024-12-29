import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let cards = (await import("../static/cards.json")).default;

app.get("/api/cards", async (_, res) => {
	res.send(cards);
});

app.post("/api/cards", async (req, res) => {
	cards = req.body;

	res.send({ data: "express success" });
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
