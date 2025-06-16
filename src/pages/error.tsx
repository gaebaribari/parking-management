import { useRouteError, Link } from "react-router";

interface ErrorType {
	data: string;
	status: number;
}

export default function Error() {
	const error = useRouteError() as ErrorType;

	return (
		<div className="py-20">
			<h1>문제가 발생했어요</h1>
			<p>에러코드 : {error.status}</p>
			<p>{error.data}</p>
			<Link to="/" className="btn-blue">
				홈으로 돌아가기
			</Link>
		</div>
	);
}
