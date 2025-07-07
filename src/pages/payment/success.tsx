import { useEffect } from "react";
import { useParkingInfoStore } from "../../stores/useParkingInfo";
import AccessBlocked from "../../components/AccessBlocked";
import { useBlockAccess } from "../../hooks/useBlockAccess";

export default function Success() {
	const { updateParkingInfo } = useParkingInfoStore();
	const blockAccess = useBlockAccess();

	useEffect(() => {
		updateParkingInfo(undefined);
	}, []);
	return (
		<div>
			{blockAccess ? (
				<AccessBlocked />
			) : (
				<div className="flex flex-col items-center justify-center align-middle min-h-screen">
					<div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 mb-4">
						<svg
							className="w-7 h-7 text-white"
							fill="none"
							stroke="currentColor"
							strokeWidth="3"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<p className="text-lg font-semibold">결제 완료</p>
					<p className="text-gray-600">주차 정산이 완료되었습니다</p>
				</div>
			)}
		</div>
	);
}
