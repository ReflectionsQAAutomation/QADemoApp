import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { login } from '@/app/lib/api';

export async function POST(request: Request) {

  const { email, password } = await request.json();

  const token = await login(email, password)

  if (!token) {

    return NextResponse.json({ message: 'invalid username or password' }, { status: 400 })
  }

  const cookie = cookies().set('token', token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })

  return NextResponse.json({ message: 'Successfully logged in.' }, { status: 200 })
}