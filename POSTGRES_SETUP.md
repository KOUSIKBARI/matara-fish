# Switching to PostgreSQL

1.  **Stop your running server** (`Ctrl+C` in the terminal).
2.  **Open your `.env` file** and replace `DATABASE_URL` with your PostgreSQL connection string:
    ```env
    DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/matara_fish?schema=public"
    ```
    *(Replace `YOUR_PASSWORD` with your actual Postgres password)*

3.  **Run the following commands** to set up the new database:
    ```bash
    # install latest prisma client
    npm install @prisma/client

    # Create the database schema
    npx prisma migrate dev --name init

    # Seed the database with initial data
    npx prisma db seed
    ```

4.  **Restart the server**:
    ```bash
    npm run dev
    ```

You are now running on PostgreSQL!
