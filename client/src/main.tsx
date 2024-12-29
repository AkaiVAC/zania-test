import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const enableMocking = async () => {
	if (import.meta.env.MODE !== "development") return;

	const { worker } = await import("@/mocks/browser");
	return worker.start({ onUnhandledRequest: "bypass" });
};

enableMocking().then(() => {
	const container = document.getElementById("root");
	const root = createRoot(container!);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
