import { authorize } from '@/middleware/auth';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// DELETE /api/medicines/[id]
export async function DELETE(req, { params }) {
  const authMiddleware = authorize(['manager']);
  const response = await authMiddleware(req);

  if (response.status !== 200) {
    return response; 
  }

  try {
   
    const { id } = params;
    console.log(id)

    if (!id) {
      return new Response('ID is required', { status: 400 });
    }

    const deletedMedicine = await prisma.medicine.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedMedicine), { status: 200 });
  } catch (error) {
    return new Response(`Medicine with ID ${id} not found`, { status: 404 });
  }
}

export async function PUT(req, { params }) {
    const authMiddleware = authorize(['manager']);
    const response = await authMiddleware(req);
  
    if (response.status !== 200) {
      return response; 
    }
  
    try {
      const { id } = params;
      const { name, manufacturer, price, stock, discount } = await req.json();
  
      if (!id) {
        return new Response('ID is required', { status: 400 });
      }
  
      if (!name && !manufacturer && !price && !stock && !discount) {
        return new Response('At least one field is required to update', { status: 400 });
      }
  
      // Update the medicine
      const updatedMedicine = await prisma.medicine.update({
        where: { id },
        data: { name, manufacturer, price, stock, discount },
      });
  
      return new Response(JSON.stringify(updatedMedicine), { status: 200 });
    } catch (error) {
      return new Response(`Medicine with ID ${id} not found`, { status: 404 });
    }
  }


export async function GET( req ,{ params }) {

  const authMiddleware = authorize(['manager']);
  const response = await authMiddleware(req);

  if (response.status !== 200) {
    return response; // Return early if not authorized
  }
  const { id } = params;
  console.log(id)

  try {
    const medicine = await prisma.medicine.findUnique({
      where: { id},
    });

    if (!medicine) {
      return NextResponse.json({ message: 'Medicine not found' }, { status: 404 });
    }

    return NextResponse.json(medicine);
  } catch (error) {
    console.error('Error fetching medicine:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

