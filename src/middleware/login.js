// src/middleware/login.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export function loginMiddleware(req) {
  const token = req.cookies.get('token')?.value; // Get token from cookies

  if (token) {
    try {
      jwt.verify(token, SECRET_KEY);
      // If token is valid, redirect to the dashboard or any other page
      return NextResponse.redirect(new URL('/manager/dashboard', req.url));
    } catch (error) {
      // If token is invalid, proceed to the login page
      return NextResponse.next();
    }
  }

  // If no token, proceed to the login page
  return NextResponse.next();
}

// Apply login middleware only to the /login route
export const config = {
  matcher: ['/login'],
};
