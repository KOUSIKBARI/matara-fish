import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
    try {
        const products = [
            {
                name: 'Rohu (River)',
                bengaliName: 'Rui (Nodi)',
                description: 'Fresh river Rohu, sweet taste. Daily catch.',
                price: 350,
                unit: 'kg',
                category: 'Freshwater Fish',
                available: true,
            },
            {
                name: 'Catla (Large)',
                bengaliName: 'Katla (Boro)',
                description: 'Big size Katla fish, perfect for daily curry.',
                price: 400,
                unit: 'kg',
                category: 'Freshwater Fish',
                available: true,
            },
            {
                name: 'Hilsa (Padma)',
                bengaliName: 'Ilish (Padma)',
                description: 'Premium quality Hilsa from Padma river. 1kg+ size.',
                price: 1500,
                unit: 'kg',
                category: 'Seawater Fish',
                available: true,
            },
            {
                name: 'Tiger Prawn',
                bengaliName: 'Bagda Chingri',
                description: 'Large export quality tiger prawns.',
                price: 800,
                unit: 'kg',
                category: 'Prawns',
                available: true,
            },
            {
                name: 'Pomfret',
                bengaliName: 'Pomfret',
                description: 'Fresh seawater Pomfret.',
                price: 600,
                unit: 'kg',
                category: 'Seawater Fish',
                available: true,
            },
            {
                name: 'Mud Crab',
                bengaliName: 'Kankra',
                description: 'Live mud crabs, distinct taste.',
                price: 450,
                unit: 'kg',
                category: 'Crabs',
                available: true,
            },
        ];

        for (const product of products) {
            await prisma.product.create({
                data: product
            })
        }

        return NextResponse.json({ success: true, message: "Seeding complete" });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
