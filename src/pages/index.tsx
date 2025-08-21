import ParkingInput from "../components/ParkingInput";
import { useParkingInfoStore } from "../stores/useParkingInfo";
import ParkingInfo from "../components/ParkingInfo";
import { useEffect, useState } from "react";
import InputTutorial from "../components/InputTutorial";

export default function Index() {
	const { parkingInfo } = useParkingInfoStore();
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (parkingInfo) return;

		let blinkInterval: number;
		setShow(true);

		blinkInterval = window.setInterval(() => {
			setShow((prev) => !prev);
		}, 500);

		const timeout = window.setTimeout(() => {
			clearInterval(blinkInterval);
			setShow(false);
		}, 3000);

		return () => {
			clearInterval(blinkInterval);
			clearTimeout(timeout);
		};
	}, []);
	return (
		<div className="py-20">
			<p className="mb-5 text-lg font-semibold">주차 정산 프로그램</p>
			<ParkingInput />
			{show && <InputTutorial />}
			{parkingInfo ? <ParkingInfo /> : null}
		</div>
	);
}
