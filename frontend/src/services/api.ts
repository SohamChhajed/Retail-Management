const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type SortBy = "date" | "quantity" | "customer_name";

export interface TransactionQuery {
  q?: string;
  region?: string[];
  gender?: string[];
  ageMin?: number;
  ageMax?: number;
  category?: string[];
  tags?: string[];
  paymentMethod?: string[];
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string;
  sortBy?: SortBy;
  sortDir?: "asc" | "desc";
  page?: number;
}

export interface Transaction {
  id: number;
  transaction_id: string;
  date: string;
  customer_id: string;
  customer_name: string;
  phone_number: string;
  gender: string;
  age: number;
  customer_region: string;
  customer_type: string;
  product_id: string;
  product_name: string;
  brand: string;
  product_category: string;
  tags: string;
  quantity: number;
  price_per_unit: number;
  discount_percentage: number;
  total_amount: number;
  final_amount: number;
  payment_method: string;
  order_status: string;
  delivery_type: string;
  store_id: string;
  store_location: string;
  salesperson_id: string;
  employee_name: string;
}

export interface TransactionsResponse {
  items: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function fetchTransactions(
  query: TransactionQuery
): Promise<TransactionsResponse> {
  const url = new URL("/api/retail/transactions", API_BASE);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach((v) => url.searchParams.append(key, String(v)));
    } else {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("ERROR");
  }

  return res.json();
}
