
import { authorize } from '@/middleware/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  console.log('Request received');
    const authMiddleware = authorize(['manager']);
    const response = await authMiddleware(req);
    console.log('Authorization checked');
    
    if (response.status !== 200) {
      return response; 
    }
  
    const { name, manufacturer, price, stock, discount } = await req.json();
    if (!name || !manufacturer || price == null || stock == null) {
      return Response.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const newMedicine = await prisma.medicine.create({
      data: { name, manufacturer, price, stock, discount },
    });
    return new Response(JSON.stringify(newMedicine), { status: 201 });
  }
export async function GET(req) {
  const medicines = await prisma.medicine.findMany();
  return new Response(JSON.stringify(medicines), { status: 200 });
}
export async function DELETE(req) {
    const authMiddleware = authorize(['manager']);
    const response = await authMiddleware(req);
  
    if (response.status !== 200) {
      return response; // Return early if not authorized
    }
  
    try {
      const { id } = await req.json();

      console.log(id)
      const deletedMedicine = await prisma.medicine.delete({
        where: { id },
      });
      return new Response(JSON.stringify(deletedMedicine), { status: 200 });
    } catch (error) {
      return new Response(`Medicine with ID ${id} not found`, { status: 404 });
    }
  }
  export async function PUT(req) {
    const authMiddleware = authorize(['manager']);
    const response = await authMiddleware(req);
   
    if (response.status !== 200) {
      return response; // Return early if not authorized
    }
  
    try {
      const { id, name, manufacturer, price, stock, discount } = await req.json();
      
      // Check if ID is provided
      if (!id) {
        return new Response('ID is required', { status: 400 });
      }
      
      // Update the medicine
      const updatedMedicine = await prisma.medicine.update({
        where: { id },
        data: { name, manufacturer, price, stock, discount },
      });
      
      return new Response(JSON.stringify(updatedMedicine), { status: 200 });
    } catch (error) {
      return new Response(`Failed to update medicine or Medicine with ID ${id} not found`, { status: 404 });
    }
  }




