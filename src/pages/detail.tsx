import { useEffect, useState } from "react";
import CouponPayment from "../components/CouponPayment";
import ParkingInfo from "../components/ParkingInfo";
import { useParkingInfoStore } from "../stores/useParkingInfo";

export default function Detail() {
	const { parkingInfo } = useParkingInfoStore();
	const [parkingTime, setParkingTime] = useState(0);

	useEffect(() => {
		let nowDate = new Date("2025-02-14 15:35:13");
		let ParkingTimestamp = new Date(parkingInfo?.timestamp as string);

		let diffTime =
			((nowDate.getTime() - ParkingTimestamp.getTime()) / (1000 * 60 * 60)) %
			24;
		setParkingTime(diffTime);
	}, []);

	const discountParkingTime = (duration: number) => {
		setParkingTime((prev) => prev - duration);
	};

	return (
		<div className="p-5">
			<ParkingInfo parkingInfo={parkingInfo} parkingTime={parkingTime} />
			<CouponPayment
				discountParkingTime={discountParkingTime}
				parkingTime={parkingTime}
			/>
		</div>
	);
}
