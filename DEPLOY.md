# Deployment Guide for Ma Tara Fish Center

This project is built with Next.js, Prisma, and Tailwind CSS. It is optimized for Vercel.

## Prerequisites

1.  **Vercel Account**: [Sign up here](https://vercel.com/signup).
2.  **GitHub Repository**: Push this code to a GitHub repository.
3.  **Database**:
    *   **Current (Dev)**: SQLite (`dev.db`). Vercel does **NOT** support persistent SQLite.
    *   **Production**: You MUST use a PostgreSQL database (e.g., Vercel Postgres, Neon, or Supabase).

## Step-by-Step Vercel Deployment

1.  **Connect to Vercel**:
    *   Go to Vercel Dashboard -> "Add New..." -> "Project".
    *   Import your GitHub repository.

2.  **Configure Project**:
    *   **Framework**: Next.js (Auto-detected).
    *   **Root Directory**: `./` (Default).
    *   **Build Command**: `npx prisma generate && next build`.
        *   *Note*: You need to override the default `next build` to generate the Prisma client first.

3.  **Environment Variables**:
    Add the following variables in Vercel Settings:
    *   `DATABASE_URL`: Your PostgreSQL connection string.
        *   Example: `postgres://user:password@host:port/database`

4.  **Database Migration**:
    *   Since you are switching from SQLite to Postgres, you need to update `prisma/schema.prisma`:
        ```prisma
        datasource db {
          provider = "postgresql"
          url      = env("DATABASE_URL")
        }
        ```
    *   Run migration locally or in Vercel build (requires precise setup).
    *   **Recommended**: Run `npx prisma db push` from your local machine (connected to the Prod DB URL) *before* deployment to set up the schema.

5.  **Deploy**:
    *   Click "Deploy".
    *   Wait for the build to complete.

## Post-Deployment

1.  **Seeding Data**:
    *   Access the internal API to seed initial categories: `https://your-domain.vercel.app/api/seed`
    *   Or use the Admin Panel to add products manually.

2.  **SEO Check**:
    *   Verify `sitemap.xml` is accessible at `https://your-domain.vercel.app/sitemap.xml`.

## Troubleshooting

*   **Prisma Client Error**: Ensure `npx prisma generate` is in the build command.
*   **Database Connection**: Double-check `DATABASE_URL` is reachable from Vercel.
*   **Images**: If using `next/image` with external hosts, update `next.config.mjs` to allow domains.
