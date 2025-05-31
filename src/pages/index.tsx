import ParkingInput from "../components/ParkingInput";
import { useParkingInfoStore } from "../stores/useParkingInfo";
import ParkingInfo from "../components/ParkingInfo";

export default function Index() {
	const { parkingInfo } = useParkingInfoStore();

	return (
		<div className="pt-20 max-w-md m-auto">
			<p className="mb-5">주차 정산 프로그램</p>
			<ParkingInput />
			{parkingInfo ? <ParkingInfo /> : null}
		</div>
	);
}
