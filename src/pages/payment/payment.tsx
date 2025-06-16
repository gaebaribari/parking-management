import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useParkingInfoStore } from "../../stores/useParkingInfo";
import AccessBlocked from "../../components/AccessBlocked";

export default function Payment() {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { parkingInfo } = useParkingInfoStore();
	const [blockAccess, setBlockAccess] = useState(false);
	useEffect(() => {
		if (!parkingInfo) {
			setBlockAccess(true);
			return;
		}

		let timer = setTimeout(() => {
			setLoading(false);
			navigate("/success", { replace: true });
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<div>
			{blockAccess ? (
				<AccessBlocked />
			) : (
				<div className="flex flex-col items-center justify-center min-h-screen">
					<LoadingSpinner loading={loading} />
					<p className="text-lg font-semibold">결제 진행 중입니다</p>
				</div>
			)}
		</div>
	);
}
