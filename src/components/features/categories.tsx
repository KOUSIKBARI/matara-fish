import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const categories = [
    { id: 'freshwater', name: 'Freshwater Fish', bengali: 'মিঠা জলের মাছ', color: 'bg-blue-50' },
    { id: 'seawater', name: 'Seawater Fish', bengali: 'সামুদ্রিক মাছ', color: 'bg-teal-50' },
    { id: 'prawns', name: 'Prawns & Shrimp', bengali: 'চিংড়ি', color: 'bg-orange-50' },
    { id: 'crabs', name: 'Crabs', bengali: 'কাঁকড়া', color: 'bg-red-50' },
]

export function Categories() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container-custom">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-river-blue mb-2">Shop by Category</h2>
                        <p className="text-gray-500">Find exactly what you are looking for</p>
                    </div>
                    <Link href="/shop" className="hidden md:flex items-center text-mustard-hover font-medium hover:underline">
                        View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categories.map((cat) => (
                        <Link key={cat.id} href={`/shop?category=${encodeURIComponent(cat.name)}`}>
                            <Card className="hover:shadow-md transition-all cursor-pointer border-transparent hover:border-river-blue/10 h-full">
                                <CardContent className={`p-6 flex flex-col items-center text-center h-full justify-center ${cat.color} rounded-xl`}>
                                    <div className="w-16 h-16 rounded-full bg-white/60 shadow-sm flex items-center justify-center mb-4 text-3xl">
                                        {cat.id === 'freshwater' && '🐟'}
                                        {cat.id === 'seawater' && '🌊'}
                                        {cat.id === 'prawns' && '🦐'}
                                        {cat.id === 'crabs' && '🦀'}
                                    </div>
                                    <h3 className="font-bold text-river-blue text-lg">{cat.name}</h3>
                                    <p className="font-bengali text-gray-500 text-sm mt-1">{cat.bengali}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/shop" className="inline-flex items-center text-mustard-hover font-medium hover:underline">
                        View Full Menu <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
