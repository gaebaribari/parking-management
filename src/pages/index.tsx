import { Outlet } from "react-router";
import ParkingInput from "../components/ParkingInput";
import { useParkingInfoStore } from "../stores/useParkingInfo";

export default function Index() {
	const { parkingInfo } = useParkingInfoStore();

	return (
		<div className="p-5">
			<p className="mb-3">주차 정산 프로그램</p>
			<ParkingInput />
			{parkingInfo ? <Outlet /> : null}
		</div>
	);
}
