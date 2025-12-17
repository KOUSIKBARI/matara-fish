import type { Metadata } from "next";
import { Outfit, Noto_Sans_Bengali } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ma Tara Fish Center | Haldia's Premium Fish Retail",
  description: "Fresh river and sea fish delivered to your doorstep in Haldia. Order online for daily fresh catch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${notoSansBengali.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FishStore",
              "name": "Ma Tara Fish Center",
              "image": "https://matarafish.com/og-image.jpg",
              "description": "Premium fresh fish retail store in Haldia. We deliver river and sea fish directly to your kitchen.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Durgachak Market",
                "addressLocality": "Haldia",
                "addressRegion": "West Bengal",
                "postalCode": "721602",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 22.0667,
                "longitude": 88.0698
              },
              "url": "https://matarafish.com",
              "telephone": "+919876543210",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "06:00",
                  "closes": "13:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "17:00",
                  "closes": "21:00"
                }
              ],
              "priceRange": "₹₹"
            }),
          }}
        />
      </body>
    </html>
  );
}
