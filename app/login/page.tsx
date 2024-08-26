"use client"

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';

export default function LoginPage() {

    const router = useRouter()

    const [errorMessage, setErrorMessage] = useState<string>('')

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault()

        try {
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
                setErrorMessage('Invalid username or password')
            }
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20">
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                            Please log in to continue.
                        </h1>
                        <div className="w-full">
                            <div>
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        defaultValue='eve.holt@reqres.in'
                                        required
                                    />
                                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label
                                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        minLength={6}
                                        defaultValue='cityslicka'
                                    />
                                    <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                                </div>
                            </div>
                        </div>
                        <Button className="mt-4 w-full" type='submit' id="login-btn">
                            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                        </Button>
                        {errorMessage && (
                            <div className="mt-4 flex items-center text-red-600">
                                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                                <span>{errorMessage}</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
