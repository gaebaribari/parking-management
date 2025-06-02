import { useEffect, useState } from "react";
import { useParkingInfoStore } from "../../stores/useParkingInfo";
import AccessBlocked from "../../components/AccessBlocked";

export default function Success() {
	const { parkingInfo, updateParkingInfo } = useParkingInfoStore();
	const [blockAccess, setBlockAccess] = useState(false);

	useEffect(() => {
		if (window.history.state.idx == 0 || !parkingInfo) setBlockAccess(true);
		updateParkingInfo(undefined);
	}, []);
	return (
		<div>
			{blockAccess ? (
				<AccessBlocked />
			) : (
				<div className="p-20 text-center">
					<p>결제 완료</p>
					<p>주차 정산이 완료되었습니다</p>
				</div>
			)}
		</div>
	);
}
