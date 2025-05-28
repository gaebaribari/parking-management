import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useParkingInfoStore } from "../../stores/useParkingInfo";
import AccessBlocked from "../../components/AccessBlocked";

interface PaymentProps {
	price: number;
}

export default function Payment({ price }: PaymentProps) {
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
			console.log("Timeout cleared");
		};
	}, []);

	return (
		<div className="p-5">
			{blockAccess ? (
				<AccessBlocked />
			) : (
				<div className="p-5">
					<LoadingSpinner loading={loading} />
					<p className="text-center">{price} 결제하는중</p>
				</div>
			)}
		</div>
	);
}
