
# 🍽️ Food Ordering Backend API

This is the backend server for the Food Ordering Application. It uses **Node.js**, **Express**, **MongoDB** for menu data, and **MySQL** for managing user and order information.

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js v14+
- MongoDB (Local or Cloud - MongoDB Atlas)
- MySQL (Local)

---

## 🛠️ Installation

```bash
git clone https://github.com/Asriths31/eatoes-Assignment-Backend.git
cd eatoes-Assignment-Backend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## 🧩 MongoDB Schema (Menu Items)

Stored in a collection for different categories like **Appetizers**, **Main Course**, and **Desserts**.

```js
{
  _id: ObjectId,
  id: String,
  name: String,
  description: String,
  price: Number,
  image: String
}
```

---

## 🗃️ MySQL Schema (Users and Orders)

### 🧑‍💻 `users` Table

| Column     | Type     |
|------------|----------|
| user_id    | INT (PK) |
| username   | VARCHAR  |
| phone_no   | VARCHAR  |

### 🛒 `orders` Table

| Column     | Type     | Description                          |
|------------|----------|--------------------------------------|
| order_id   | INT (PK) | Unique ID for the order              |
| user_id    | INT (FK) | References `users.user_id`           |
| item_id    | VARCHAR  | ID of the menu item ordered          |
| price      | INT      | Price of the ordered item            |

---

## 🌐 API Endpoints

### 📋 Menu

| Method | Endpoint       | Description                  |
|--------|----------------|------------------------------|
| GET    | `/`            | Fetch main course items      |
| GET    | `/appetite`    | Fetch appetizers menu        |
| GET    | `/desserts`    | Fetch desserts menu          |
| POST   | `/addItem`     | Add new item to any menu     |

### 👤 User & Orders *(SQL based, not included in deployment)*

| Method | Endpoint       | Description                              |
|--------|----------------|------------------------------------------|
| POST   | `/user`        | Add user order to MySQL table            |
| GET    | `/usersData`   | Retrieve previous order history (SQL)    |

> **Note**: The `/user` and `/usersData` endpoints are currently **excluded from deployment** due to SQL deployment limitations. The schemas and functionality are implemented locally.

---

## 🧪 Running the Server

```bash
node index.js
```

The server will start on `http://localhost:5000` or your specified port.

---

## 🌍 Deployment

Frontend is deployed separately. The backend (except SQL endpoints) is deployed and can be accessed via the provided API base URL.

---

## 📌 Notes

- SQL data is handled locally.
- MongoDB is used for menu management and is fully deployed.
- You may request the SQL table schemas if needed for review.
| Data Type       | Database Used | Reason                                                             |
|------------------|----------------|--------------------------------------------------------------------|
| Menu Items       | MongoDB        | Flexible schema, unstructured data, optimized for read operations |
| Users            | MySQL (SQL)    | Structured data, strong relational integrity                      |
| Orders           | MySQL (SQL)    | Requires foreign key relationships, transactional consistency     |


---

