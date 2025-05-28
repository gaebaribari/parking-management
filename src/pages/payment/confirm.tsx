import { NavLink, useNavigate } from "react-router-dom";

export default function Confirm() {
	const navigate = useNavigate();

	return (
		<div className="p-20 text-center">
			<p>10000원 결제 하시겠습니까?</p>
			<div className="mt-8 ">
				<button
					onClick={() => navigate(-1)}
					className="bg-gray-300  py-3 px-4 mr-2 rounded-lg"
				>
					아니오
				</button>
				<NavLink
					to="/payment"
					className="bg-blue-700 text-white py-3 px-4 rounded-lg"
					replace
				>
					예
				</NavLink>
			</div>
		</div>
	);
}
