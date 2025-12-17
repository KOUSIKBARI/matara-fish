'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

// --- Products ---

export async function getProducts(category?: string) {
    try {
        const where = category ? { category: category, available: true } : { available: true }
        return await prisma.product.findMany({
            where,
            orderBy: { name: 'asc' }
        })
    } catch (error) {
        console.error("Failed to fetch products:", error)
        return []
    }
}

export async function getProductById(id: string) {
    try {
        return await prisma.product.findUnique({
            where: { id }
        })
    } catch (error) {
        console.error("Failed to fetch product:", error)
        return null
    }
}

export async function createProduct(data: any) {
    try {
        await prisma.product.create({
            data: {
                name: data.name,
                bengaliName: data.bengaliName,
                price: parseFloat(data.price),
                unit: data.unit,
                category: data.category,
                available: true, // Default
                description: data.description,
            }
        })
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        return { success: true }
    } catch (error) {
        console.error("Failed to create product:", error)
        return { success: false, error: "Failed to create product" }
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({ where: { id } })
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed to delete" }
    }
}

export async function toggleProductAvailability(id: string, currentStatus: boolean) {
    try {
        await prisma.product.update({
            where: { id },
            data: { available: !currentStatus }
        })
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        return { success: true }
    } catch (error) {
        return { success: false, error: "Failed" }
    }
}

// --- Pincode Validation ---

const ALLOWED_PINCODES = ['721649', '721645']

export async function validatePincode(pincode: string) {
    return ALLOWED_PINCODES.includes(pincode)
}

// --- Orders ---

export type CreateOrderData = {
    customerName: string
    phone: string
    address: string
    pincode: string
    type: 'RETAIL' | 'BULK'
    items: { productId?: string; productName: string; quantity: number; price: number }[]
    totalAmount: number
    occasion?: string
    deliveryDate?: string
}

export async function createOrder(data: CreateOrderData) {
    try {
        // Basic validation
        if (!validatePincode(data.pincode)) {
            return { success: false, error: "Delivery not available in this area." }
        }

        const order = await prisma.order.create({
            data: {
                customerName: data.customerName,
                phone: data.phone,
                address: data.address,
                pincode: data.pincode,
                type: data.type,
                status: 'RECEIVED',
                paymentStatus: 'PENDING',
                totalAmount: data.totalAmount,
                occasion: data.occasion,
                deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
                items: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        })

        revalidatePath('/admin')
        revalidatePath('/admin/orders')
        return { success: true, orderId: order.id }
    } catch (error) {
        console.error("Failed to create order:", error)
        return { success: false, error: "Internal Server Error" }
    }
}

export async function getOrder(id: string) {
    try {
        return await prisma.order.findUnique({
            where: { id },
            include: { items: true }
        })
    } catch (error) {
        return null
    }
}

export async function updateOrderStatus(id: string, status: string) {
    try {
        await prisma.order.update({
            where: { id },
            data: { status }
        })
        revalidatePath('/admin/orders')
        revalidatePath(`/track/${id}`)
        return { success: true }
    } catch (error) {
        console.error("Failed to update status:", error)
        return { success: false, error: "Failed to update" }
    }
}
