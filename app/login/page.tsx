"use client"

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {

    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (response.ok) {

            router.push('/dashboard')
        } else {
            // Handle errors
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <input
                            id='email'
                            name='email'
                            type="email"
                            placeholder="Enter email"
                            value='eve.holt@reqres.in'
                            onChange={(e) => e.target.value}
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium">Password</label>
                        <input
                            id='password'
                            name='password'
                            type="password"
                            placeholder="Enter password"
                            value='cityslicka'
                            onChange={(e) => e.target.value}
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
