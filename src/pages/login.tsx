import React, { useState, useEffect } from 'react';
import kakaoLoginImageURL from '../images/kakao_login_large_narrow.png';
const { Kakao } = window;


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
        window.Kakao.Auth.authorize({
            redirectUri: process.env.REACT_APP_REDIRECT_URI,
        });
    }

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
            <div className='mt-3 flex flex-col items-center justify-center gap-2'>
                <button
                    className="rounded-lg bg-blue-500 h-12 w-[222px] text-white peer-invalid:bg-gray-500 text-lg disabled:bg-gray-300 disabled:opacity-50"
                    disabled={!username || !password}
                >LOGIN</button>
                <a href='#' onClick={handleClick}>
                    <img
                        src={kakaoLoginImageURL}
                        width="222"
                    />
                </a>
            </div>

        </div>
    );
}

