import { MetadataRoute } from 'next'
import { getProducts } from './actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://matarafish.com' // Replace with actual domain later or env

    // Static Routes
    const routes = [
        '',
        '/shop',
        '/bulk-order',
        '/track',
        '/cart',
        '/checkout',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic Product Routes
    const products = await getProducts()
    const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...productRoutes]
}
