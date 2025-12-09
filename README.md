Retail Management Dashboard

1. Overview
The Retail Management Dashboard is a full stack web application designed to analyze and explore retail transaction data. It provides an intuitive interface for business users to perform real‑time search, filtering, sorting and pagination on large datasets. The system aims to simplify sales analysis and enhance decision‑making efficiency.

2. Tech Stack
Frontend: Next.js, TypeScript, Tailwind CSS
Backend: Node.js, Express.js, SQLite
Deployment: Vercel (Frontend), Render (Backend)

3. Search Implementation Summary
The search module supports keyword‑based lookup across customer name, phone number and related text fields. The frontend forwards user queries to the backend via query parameters. The backend performs SQL LIKE matching on multiple columns and returns all relevant entries.

4. Filter Implementation Summary
Filtering allows multi criteria refinement of results, including region, gender, age range, product category, tags, payment method, and date range. The backend dynamically constructs SQL WHERE conditions based on the parameters provided. Only transactions that satisfy all selected filters are returned.

5. Sorting Implementation Summary
Sorting is supported on key attributes such as transaction date, quantity, and customer name. The frontend issues sortBy and sortDir instructions, which the backend processes using SQL ORDER BY to ensure accurate and efficient sorting.

6. Pagination Implementation Summary
The pagination system uses page number and page size to limit data returned per request. The backend computes -
offset = (page − 1) * pageSize
and retrieves only the required subset of rows. The frontend renders navigation controls for seamless movement between pages.

7. Setup Instructions

Backend:
cd backend
npm install
npm start

Frontend:
cd frontend
npm install
npm run dev

Access the application via:
http://localhost:3000

Live link : https://retail-management-deploy.vercel.app/
