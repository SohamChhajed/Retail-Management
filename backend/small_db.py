import sqlite3
import csv

DB_NAME = "retail_sales_small.db"
CSV_NAME = "truestate_assignment_dataset.csv"
MAX_ROWS = 5000 

conn = sqlite3.connect(DB_NAME)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id TEXT,
    date TEXT,
    customer_id TEXT,
    customer_name TEXT,
    phone_number TEXT,
    gender TEXT,
    age INTEGER,
    customer_region TEXT,
    customer_type TEXT,
    product_id TEXT,
    product_name TEXT,
    brand TEXT,
    product_category TEXT,
    tags TEXT,
    quantity INTEGER,
    price_per_unit REAL,
    discount_percentage REAL,
    total_amount REAL,
    final_amount REAL,
    payment_method TEXT,
    order_status TEXT,
    delivery_type TEXT,
    store_id TEXT,
    store_location TEXT,
    salesperson_id TEXT,
    employee_name TEXT
);
""")

with open(CSV_NAME, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for i, row in enumerate(reader):
        if i >= MAX_ROWS:
            break
        cur.execute("""
            INSERT INTO transactions VALUES (
                :Transaction_ID, :Date, :Customer_ID, :Customer_Name,
                :Phone_Number, :Gender, :Age, :Customer_Region,
                :Customer_Type, :Product_ID, :Product_Name, :Brand,
                :Product_Category, :Tags, :Quantity, :Price_per_Unit,
                :Discount_Percentage, :Total_Amount, :Final_Amount,
                :Payment_Method, :Order_Status, :Delivery_Type,
                :Store_ID, :Store_Location, :Salesperson_ID, :Employee_Name
            )
        """, {
            "Transaction_ID": row["Transaction ID"],
            "Date": row["Date"],
            "Customer_ID": row["Customer ID"],
            "Customer_Name": row["Customer Name"],
            "Phone_Number": row["Phone Number"],
            "Gender": row["Gender"],
            "Age": row["Age"],
            "Customer_Region": row["Customer Region"],
            "Customer_Type": row["Customer Type"],
            "Product_ID": row["Product ID"],
            "Product_Name": row["Product Name"],
            "Brand": row["Brand"],
            "Product_Category": row["Product Category"],
            "Tags": row["Tags"],
            "Quantity": row["Quantity"],
            "Price_per_Unit": row["Price per Unit"],
            "Discount_Percentage": row["Discount Percentage"],
            "Total_Amount": row["Total Amount"],
            "Final_Amount": row["Final Amount"],
            "Payment_Method": row["Payment Method"],
            "Order_Status": row["Order Status"],
            "Delivery_Type": row["Delivery Type"],
            "Store_ID": row["Store ID"],
            "Store_Location": row["Store Location"],
            "Salesperson_ID": row["Salesperson ID"],
            "Employee_Name": row["Employee Name"],
        })

conn.commit()
conn.close()

print("DONE: created", DB_NAME)
