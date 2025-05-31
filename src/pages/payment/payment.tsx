import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useLocation, useNavigate } from "react-router-dom";
import { useParkingInfoStore } from "../../stores/useParkingInfo";
import AccessBlocked from "../../components/AccessBlocked";

export default function Payment() {
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const { parkingInfo } = useParkingInfoStore();
	const [blockAccess, setBlockAccess] = useState(false);
	const location = useLocation();
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
		<div className="p-20">
			{blockAccess ? (
				<AccessBlocked />
			) : (
				<div>
					<LoadingSpinner loading={loading} />
					<p className="text-center">{location.state.price}원 결제하는중</p>
				</div>
			)}
		</div>
	);
}
