import { useState, useEffect } from "react";

interface KakaoUserInfo {
	nickname: string;
	profile_image?: string;
	thumbnail_image?: string;
}

export default function Kakao() {
	const [userInfo, setUserInfo] = useState<KakaoUserInfo | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const getKakaoUserInfo = async (accessToken: string) => {
		try {
			const response = await fetch("https://kapi.kakao.com/v2/user/me", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
				},
			});
			const data = await response.json();
			setUserInfo({
				nickname: data.properties.nickname,
				profile_image: data.properties.profile_image,
				thumbnail_image: data.properties.thumbnail_image,
			});
		} catch (error) {
			console.error("사용자 정보 조회 실패:", error);
			throw error;
		}
	};

	useEffect(() => {
		const getKakaoToken = async () => {
			try {
				const code = new URLSearchParams(window.location.search).get("code");

				const tokenResponse = await fetch(
					"https://kauth.kakao.com/oauth/token",
					{
						method: "POST",
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
						body: `grant_type=authorization_code&client_id=${
							import.meta.env.REACT_APP_REST_API_KEY
						}&redirect_uri=${
							import.meta.env.REACT_APP_REDIRECT_URI
						}&code=${code}&client_secret=${
							import.meta.env.REACT_APP_CLIENT_SECRET
						}`,
					}
				);

				const tokenData = await tokenResponse.json();
				getKakaoUserInfo(tokenData.access_token);
			} catch (err) {
				console.error("Kakao 로그인 에러:", err);
				setError(
					err instanceof Error
						? err.message
						: "로그인 처리 중 오류가 발생했습니다."
				);
			} finally {
				setIsLoading(false);
			}
		};

		if (window.location.search.includes("code=")) {
			getKakaoToken();
		} else {
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return <div className="text-center p-4">로그인 처리 중...</div>;
	}

	if (error) {
		return (
			<div className="text-center p-4">
				<div className="text-red-500 mb-4">{error}</div>
			</div>
		);
	}

	return (
		<div className="text-center p-4 pt-80">
			{userInfo && (
				<div>
					<div>환영합니다, {userInfo.nickname}님!</div>
					{userInfo.profile_image && (
						<img
							src={userInfo.profile_image}
							alt="프로필 이미지"
							className="w-20 h-20 rounded-full mx-auto mt-4"
						/>
					)}
				</div>
			)}
		</div>
	);
}
