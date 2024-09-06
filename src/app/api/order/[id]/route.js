import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    // Delete the order by ID
    const deletedOrder = await prisma.order.delete({
      where: {
        id: id, 
      },
    });

    
    return NextResponse.json({ message: 'Order deleted successfully', order: deletedOrder }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete order:', error);
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }
}
