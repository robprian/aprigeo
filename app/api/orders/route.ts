import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(session.user.id)
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform data to match frontend format
    const formattedOrders = orders.map(order => ({
      id: order.orderNumber,
      date: order.createdAt.toISOString(),
      status: order.status,
      total: Number(order.total),
      items: order.items.map(item => ({
        id: Number(item.productId),
        name: item.product.name,
        slug: item.product.slug,
        price: Number(item.price),
        quantity: item.quantity,
        total: Number(item.total),
        image: item.product.images && item.product.images.length > 0 ? item.product.images[0] : '/placeholder.svg'
      })),
      shipping: {
        address: typeof order.shippingAddress === 'string' ? order.shippingAddress : JSON.stringify(order.shippingAddress),
        method: 'Standard Shipping',
        tracking: null,
        carrier: null,
        estimatedDelivery: null,
        deliveredDate: null
      },
      payment: {
        method: 'Credit Card',
        last4: null,
        email: session.user?.email || null,
        subtotal: Number(order.subtotal),
        shipping: Number(order.shippingAmount),
        tax: Number(order.taxAmount),
        total: Number(order.total)
      }
    }))

    return NextResponse.json({ data: formattedOrders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}
