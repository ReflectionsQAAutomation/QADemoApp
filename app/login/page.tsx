"use client"

// import { useState } from "react";
// import { useRouter } from 'next/router';

export default function Login() {
    //   const [email, setEmail] = useState('');
    //   const [password, setPassword] = useState('');
    //   const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // if (email === 'admin@admin.com' && password === 'admin') {
        //   localStorage.setItem('authenticated', 'true');
        //   router.push('/');
        // } else {
        //   alert('Invalid credentials');
        // }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                    <button type="submit" className="h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 w-full text-center">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
