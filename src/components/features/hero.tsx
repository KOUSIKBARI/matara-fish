import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
    return (
        <section className="relative w-full py-20 md:py-32 overflow-hidden bg-river-blue">
            {/* Abstract Background - River Flow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container-custom relative z-10 text-center">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-mustard-gold backdrop-blur-md mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-mustard-gold mr-2"></span>
                    Serving Haldia for 22+ Years
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                    Freshness from the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                        River to Your Door
                    </span>
                </h1>

                <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
                    We bring the finest catch from local rivers and sea directly to your kitchen.
                    Cleaning, cutting, and delivery with the trust of <span className="font-bengali text-mustard-gold">মা তারা ফিশ সেন্টার</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/shop">
                        <Button size="lg" className="w-full sm:w-auto h-14 md:text-lg font-bold bg-mustard-gold text-river-blue hover:bg-mustard-hover shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                            Order Fresh Fish <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/bulk-order">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 md:text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                            Bulk / Occasion Order
                        </Button>
                    </Link>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 md:gap-16 text-gray-400 text-sm md:text-base font-medium opacity-80">
                    <span className="flex items-center gap-2">
                        ✅ Daily Fresh Catch
                    </span>
                    <span className="flex items-center gap-2">
                        ✅ Chemical Free
                    </span>
                    <span className="flex items-center gap-2">
                        ✅ Expert Cutting
                    </span>
                </div>
            </div>
        </section>
    )
}
