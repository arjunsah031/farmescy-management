import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; 

export async function POST(req) {

  const { username, password } = await req.json();

  // Predefined store manager account
  if (username === 'test-admin' && password === 'test-admin') {
    const token = jwt.sign({ role: 'manager' }, SECRET_KEY, { expiresIn: '1h' });
    return NextResponse.json({ token }, { status: 200 });
  }

  // Find Sales Executive
  const user = await prisma.salesExecutive.findUnique({
    where: { username },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ role: 'executive', userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
  return NextResponse.json({ token }, { status: 200 });
}
