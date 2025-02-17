import { useState, useEffect } from 'react';
import { OAuthProvider, signInWithCredential, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from './firebase';

declare global {
    interface Window {
        Kakao: any;
    }
}

interface KakaoUserInfo {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
}

export default function Kakao() {
    const [idToken, setIdToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<KakaoUserInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeKakao = async () => {
            const KAKAO_JS_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
            if (!KAKAO_JS_KEY) {
                console.error('Kakao JavaScript 키가 설정되지 않았습니다.');
                setError('카카오 설정이 누락되었습니다.');
                setIsLoading(false);
                return;
            }

            try {
                if (!window.Kakao?.isInitialized()) {
                    window.Kakao.init(KAKAO_JS_KEY);
                    console.log('Kakao SDK 초기화 성공');
                }
            } catch (error) {
                console.error('Kakao 초기화 에러:', error);
                setError('Kakao SDK 초기화 중 오류가 발생했습니다.');
                setIsLoading(false);
            }
        };

        if (window.Kakao) {
            initializeKakao();
        } else {
            const script = document.createElement('script');
            script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
            script.async = true;
            script.onload = () => initializeKakao();
            document.head.appendChild(script);
        }
    }, []);

    const getKakaoUserInfo = async (accessToken: string) => {

        try {
            const response = await fetch('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });
            const data = await response.json();
            return {
                nickname: data.properties.nickname,
                profile_image: data.properties.profile_image,
                thumbnail_image: data.properties.thumbnail_image,
            };
        } catch (error) {
            console.error('사용자 정보 조회 실패:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getKakaoToken = async () => {
            try {
                const code = new URL(window.location.href).searchParams.get('code');

                if (!code) {
                    setError('인증 코드를 찾을 수 없습니다.');
                    setIsLoading(false);
                    return;
                }

                const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&code=${code}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`,
                });

                const tokenData = await tokenResponse.json();
                
                if (tokenData.access_token) {
                    window.Kakao.Auth.setAccessToken(tokenData.access_token);
                    
                    const userInfo = await getKakaoUserInfo(tokenData.access_token);
                    setUserInfo(userInfo);
                    
                    const provider = new OAuthProvider("oidc.kakao");
                    const credential = provider.credential({
                        idToken: tokenData.id_token,
                    });

                    const result = await signInWithCredential(auth, credential);
                    console.log('Firebase 인증 결과:', result);
                    const firebaseCredential = OAuthProvider.credentialFromResult(result);
                    setIdToken(firebaseCredential?.idToken || null);
                }
            } catch (err) {
                console.error('Kakao 로그인 에러:', err);
                setError(err instanceof Error ? err.message : '로그인 처리 중 오류가 발생했습니다.');
            } finally {
                setIsLoading(false);
            }
        };

        if (window.location.search.includes('code=')) {
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
        <div className="text-center p-4">
            {idToken && userInfo && (
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