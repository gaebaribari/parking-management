import { useEffect, useState } from "react";
import { useParkingInfoStore } from "../stores/useParkingInfo";
import { NavLink } from "react-router-dom";

export default function ParkingInfo() {
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

	return (
		<div className="p-6 space-y-6">
			<div className="flex justify-center">
				<img
					className="h-36 w-36 object-cover rounded-md border border-gray-600"
					src={parkingInfo?.imgUrl}
					alt="차량 이미지"
				/>
			</div>

			<div className="border-t border-gray-200 pt-4 space-y-3 text-gray-800 text-[16px]">
				<div className="flex items-center">
					<span className="w-32 font-medium text-gray-600">차 번호</span>
					<span>{parkingInfo?.car_number}</span>
				</div>
				<div className="flex items-center">
					<span className="w-32 font-medium text-gray-600">입차 시간</span>
					<span>{parkingInfo?.timestamp}</span>
				</div>
				<div className="flex items-center">
					<span className="w-32 font-medium text-gray-600">주차 시간</span>
					<span>{parkingTime}시간</span>
				</div>
				<div className="flex items-center">
					<span className="w-32 font-medium text-gray-600">결제 금액</span>
					<span>{parkingTime * 1000} 원</span>
				</div>
			</div>

			<div className="pt-4">
				<NavLink to="/payment" className="btn-blue w-100 py-3">
					{parkingTime * 1000}원 결제하기
				</NavLink>
			</div>
		</div>
	);
}
