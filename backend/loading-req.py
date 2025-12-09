import csv
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
CSV_PATH = BASE_DIR / "truestate_assignment_dataset.csv"      
DB_PATH = BASE_DIR / "retail_sales.db"     

print(f"Using CSV: {CSV_PATH}")
print(f"Creating DB at: {DB_PATH}")
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
create_table_sql = "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_id TEXT, date TEXT, customer_id TEXT, customer_name TEXT, phone_number TEXT, gender TEXT, age INTEGER, customer_region TEXT, customer_type TEXT, product_id TEXT, product_name TEXT, brand TEXT, product_category TEXT, tags TEXT, quantity INTEGER, price_per_unit REAL, discount_percentage REAL, total_amount REAL, final_amount REAL, payment_method TEXT, order_status TEXT, delivery_type TEXT, store_id TEXT, store_location TEXT, salesperson_id TEXT, employee_name TEXT);"

cur.execute(create_table_sql)

insert_sql = "INSERT INTO transactions (transaction_id, date, customer_id, customer_name, phone_number, gender, age, customer_region, customer_type, product_id, product_name, brand, product_category, tags, quantity, price_per_unit, discount_percentage, total_amount, final_amount, payment_method, order_status, delivery_type, store_id, store_location, salesperson_id, employee_name) VALUES (:Transaction_ID, :Date, :Customer_ID, :Customer_Name, :Phone_Number, :Gender, :Age, :Customer_Region, :Customer_Type, :Product_ID, :Product_Name, :Brand, :Product_Category, :Tags, :Quantity, :Price_per_Unit, :Discount_Percentage, :Total_Amount, :Final_Amount, :Payment_Method, :Order_Status, :Delivery_Type, :Store_ID, :Store_Location, :Salesperson_ID, :Employee_Name);"

with open(CSV_PATH, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    conn.execute("BEGIN")  
    count = 0

    for row in reader:
        params = {
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
        }

        cur.execute(insert_sql, params)
        count += 1

        if count % 10000 == 0:
            print(f"insert {count} rows")

    conn.commit()

print(f"db done")
conn.close()
