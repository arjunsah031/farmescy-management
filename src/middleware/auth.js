// src/middleware/auth.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export function authorize(roles = []) {
  return async function middleware(req) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return NextResponse.json({ message: 'Authorization header missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY);

      if (!roles.includes(decoded.role)) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
      }

      req.user = decoded; // Attach the decoded user to the request object
      return NextResponse.next();
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  };
}
