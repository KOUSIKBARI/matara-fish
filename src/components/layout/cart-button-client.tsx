'use strict';
"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useEffect, useState } from 'react'

export function CartButtonClient() {
    const [mounted, setMounted] = useState(false)
    const items = useCart(state => state.items)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Return placeholder to match server output or null. 
        // Matching server output prevents layout shift.
        return (
            <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative text-white hover:text-mustard-gold hover:bg-white/10">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Cart</span>
                </Button>
            </Link>
        )
    }

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative text-white hover:text-mustard-gold hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-mustard-gold text-[10px] font-bold text-river-blue">
                        {itemCount}
                    </span>
                )}
            </Button>
        </Link>
    )
}
