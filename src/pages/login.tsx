import React, { useState } from 'react';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="bg-white p-5 w-full flex gap-2 flex-col max-w-screen-sm">
            <input
                className="input"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                className="input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button
                className="mt-4 rounded-lg bg-blue-500 h-10 w-full text-white peer-invalid:bg-gray-500 text-sm disabled:bg-gray-300 disabled:opacity-50"
                disabled={!username || !password}
                >LOGIN</button>
        </div>
    );
}

