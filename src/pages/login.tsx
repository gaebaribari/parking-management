import { useState } from "react";
import kakaoLoginImageURL from "../images/kakao_login_large_narrow.png";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
	const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

	return (
		<div className="bg-white p-5 w-full flex gap-2 flex-col max-w-screen-sm">
			<input
				className="LoginInput"
				placeholder="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				className="LoginInput"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<div className="mt-3 flex flex-col items-center justify-center gap-2">
				<button
					className="rounded-lg bg-blue-500 h-12 w-[222px] text-white peer-invalid:bg-gray-500 text-lg disabled:bg-gray-300 disabled:opacity-50"
					disabled={!username || !password}
				>
					LOGIN
				</button>
				<a href={KAKAO_AUTH_URL}>
					<img src={kakaoLoginImageURL} width="222" alt="" />
				</a>
			</div>
		</div>
	);
}
