import { NavLink } from "react-router-dom";

export default function AccessBlocked() {
	return (
		<div className="py-20">
			<p>잘못된 접근입니다</p>
			<NavLink to="/" className="btn-blue" replace>
				홈으로 돌아가기
			</NavLink>
		</div>
	);
}
