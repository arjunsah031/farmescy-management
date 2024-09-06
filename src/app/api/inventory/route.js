// src/app/inventory/actions.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const data = await req.json();
    const { sku, medicineId } = data;

    // Validate input
    if (!sku || !medicineId) {
        return new Response(JSON.stringify({ message: "Enter valid sku, and medicineId." }), { status: 400 });
    }

    try {
        // Create a new inventory record
        const inventory = await prisma.inventory.create({
            data: {
                sku,
                medicineId,
            },
        });

        // Return successful response
        return new Response(JSON.stringify(inventory), { status: 201 });
    } catch (err) {
        // Handle error
        return new Response(JSON.stringify({ message: 'Error creating inventory' }), { status: 500 });
    }
}

export async function GET() {
    try {
        const inventories = await prisma.inventory.findMany({
            include: {
                medicine: {
                    select: {
                        name: true,
                        manufacturer: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const formattedInventories = inventories.map(inventory => ({
            id: inventory.id,
            sku: inventory.sku,
            medicine: inventory.medicine?.name || "Unknown",
            manufacturer: inventory.medicine?.manufacturer || "Unknow",
            createdAt: inventory.createdAt,
            updatedAt: inventory.updatedAt,
        }));

        return new Response(JSON.stringify(formattedInventories), { status: 200 });
    } catch (err) {
        console.error('Error fetching inventories:', err); // Log error for debugging
        return new Response(JSON.stringify({ message: 'Error fetching inventories', error: err.message }), { status: 500 });
    }
}
