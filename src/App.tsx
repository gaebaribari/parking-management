import "./App.css";
import Login from "./pages/login";
import Settlement from "./pages/settlement";
import Choice from "./pages/choice";
import React from "react";
import ImageUploadTest from "./pages/imageUploadTest";

export default function App() {
	return (
		<div className=" h-screen flex flex-col items-center justify-center p-5">
			<h1>주차 정산 서비스</h1>
			{/* <Login></Login> */}
			<Settlement></Settlement>
			{/* <Choice></Choice> */}
			{/* <Payment></Payment> */}
			{/* <ImageUploadTest></ImageUploadTest> */}
		</div>
	);
}
