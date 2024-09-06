import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const data = await req.json();
        const { orderId, customerName, customerContact, products, totalAmount, createdBy, inventoryIds } = data;

        // Validate the required fields
        if (!orderId || !customerName || !customerContact || !products || !totalAmount || !createdBy || !inventoryIds?.length) {
            return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
        }

        // Create a new order in the Order model
        const newOrder = await prisma.order.create({
            data: {
                orderId,
                customerName,
                customerContact,
                products,
                totalAmount,
                createdBy,
            },
        });

        // Update the related inventories to associate them with the newly created order
        await prisma.inventory.updateMany({
            where: {
                id: { in: inventoryIds },
            },
            data: {
                orderId: newOrder.id,
            },
        });

        // Return the created order
        return new Response(JSON.stringify(newOrder), { status: 201 });
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ message: 'Error creating order.' }), { status: 500 });
    }
}


export async function GET(req) {
    try {
        // Fetch all orders with associated inventories
        const orders = await prisma.order.findMany({
            include: {
                inventories: {
                    include: {
                        medicine: {
                            select: {
                                name: true,
                                manufacturer: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        
        const formattedOrders = orders.map(order => ({
            id: order.id,
            orderId: order.orderId,
            customerName: order.customerName,
            customerContact: order.customerContact,
            products: order.products,
            totalAmount: order.totalAmount,
            createdBy: order.createdBy,
            inventories: order.inventories.map(inventory => ({
                id: inventory.id,
                sku: inventory.sku,
                medicine: inventory.medicine ? {
                    name: inventory.medicine.name,
                    manufacturer: inventory.medicine.manufacturer,
                } : null,
                createdAt: inventory.createdAt,
                updatedAt: inventory.updatedAt,
            })),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        }));

        return new Response(JSON.stringify(formattedOrders), { status: 200 });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return new Response(JSON.stringify({ message: 'Error fetching orders.' }), { status: 500 });
    }
}

