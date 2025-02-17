import React, { useState, useEffect } from 'react';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY as string;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI as string;
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
            <button
                className="mt-4 rounded-lg bg-blue-500 h-10 w-full text-white peer-invalid:bg-gray-500 text-sm disabled:bg-gray-300 disabled:opacity-50"
                disabled={!username || !password}
                >LOGIN</button>
                <button type="button" className='bg-yellow-500' >
                    <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
                    </button>
        </div>
    );
}

