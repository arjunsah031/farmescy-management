
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
    
    const { id } = params;

    if (!id) {
        return new Response(JSON.stringify({ message: 'Inventory ID is required' }), { status: 400 });
    }

    try {
        await prisma.inventory.delete({
            where: { id },
        });
        return new Response(JSON.stringify({ message: 'Inventory deleted successfully' }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: 'Error deleting inventory' }), { status: 500 });
    }
}
