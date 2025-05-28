import { NavLink } from "react-router-dom";

export default function AccessBlocked() {
	return (
		<div>
			<p>잘못된 접근입니다</p>
			<NavLink
				to="/"
				className="block mt-3 size-1/3 text-center text-white bg-blue-700 px-4 py-2 rounded-lg"
				replace
			>
				홈으로 돌아가기
			</NavLink>
		</div>
	);
}
