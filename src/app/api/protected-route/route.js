// app/api/test/route.js
import { NextResponse } from 'next/server';
import { authorize } from '@/middleware/auth';

export async function GET(req) {
  try {
    // Apply middleware
    const authMiddleware = authorize(['manager', 'executive']);
    const response = await authMiddleware(req);
    
    if (response.status !== 200) {
      return response; // Return early if not authorized
    }

    // Continue with route logic if authorized
    return NextResponse.json({ message: 'Test route works!' });
  } catch (err) {
    console.error('Error in test route:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
