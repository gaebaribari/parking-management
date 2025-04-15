import ReactDOM from "react-dom/client";
import "./index.css";
import React from "react";
import App from "./App";
import {} from "module";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Kakao from "./Kakao";
import Choice from "./pages/choice";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<Router basename={import.meta.env.PUBLIC_URL}>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/auth/kakao/callback" element={<Kakao />} />
			<Route path="/choice" element={<Choice />} />
		</Routes>
	</Router>
);
