# EasyEMI — Product Catalog & EMI Installment Application

- **Deployment URL**: [https://easy-emi-eight.vercel.app](https://easy-emi-eight.vercel.app)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router), TypeScript
- **Styling**: Tailwind CSS (Custom palette: `#0F6D66` Deep Teal, `#FF7A45` Warm Coral, `#FBF7F2` Warm Off-White, `#3E8E5A` Sage Green)
- **Backend API**: Next.js Route Handlers (`app/api/**/route.ts`)
- **ORM**: Prisma ORM
- **Database**: PostgreSQL (Cloud database hosted on Neon)
- **Deployment Target**: Vercel (`vercel build`)

---

## 🚀 Setup & Local Execution Instructions

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Aman-Kumar778/easyEMI.git
cd easyEMI
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and add your PostgreSQL database URL:
```bash
cp .env.example .env
```
Example `.env`:
```env
DATABASE_URL="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/easyEMI?sslmode=require"
```

### 3. Generate Prisma Client & Push Database Schema
```bash
# Generate Prisma Client types
npx prisma generate

# Push Database Schema to PostgreSQL
npx prisma db push
```

### 4. Seed Database
Populate the database with initial catalog products, variants, and EMI plan tiers:
```bash
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Schema & Data Modeling

The application utilizes a relational data model with three core entities connected via cascade relationships:

```
┌─────────────┐       1-to-Many       ┌─────────────┐       1-to-Many       ┌─────────────┐
│   Product   │ ───────────────────>  │   Variant   │ ───────────────────>  │   EmiPlan   │
└─────────────┘                       └─────────────┘                       └─────────────┘
```

### 1. `Product` Entity
Represents the top-level device model (e.g., *vivo X300 Pro*, *iPhone 17 Pro*).
- `id`: String (`cuid()`, Primary Key)
- `slug`: String (Unique URI route slug, e.g., `vivo-x300-pro`)
- `name`: String (Product display title)
- `brand`: String (Brand manufacturer, e.g., `vivo`, `Apple`, `Samsung`)
- `description`: String (Product overview and key highlights)
- `createdAt`: DateTime (Timestamp)
- `variants`: Relation to `Variant[]` (`onDelete: Cascade`)

### 2. `Variant` Entity
Represents specific storage and color finish configurations of a product (e.g., *256GB / Crimson Red*).
- `id`: String (`cuid()`, Primary Key)
- `productId`: String (Foreign Key referencing `Product.id`)
- `label`: String (Variant display label, e.g., `256GB / Crimson Red`)
- `storage`: String (Storage tier, e.g., `256GB`, `512GB`)
- `color`: String (Finish color name, e.g., `Crimson Red`, `Titanium Black`)
- `imageUrl`: String (Direct high-definition CDN image URL)
- `mrp`: Int (Struck-through Maximum Retail Price in INR)
- `price`: Int (Current selling price in INR)
- `stock`: Int (Available inventory count)
- `emiPlans`: Relation to `EmiPlan[]` (`onDelete: Cascade`)

### 3. `EmiPlan` Entity
Represents individual monthly installment options available for a specific variant.
- `id`: String (`cuid()`, Primary Key)
- `variantId`: String (Foreign Key referencing `Variant.id`)
- `tenureMonths`: Int (Tenure duration: `3`, `6`, `12`, `24`, `36`, `48`, `60` months)
- `monthlyAmount`: Int (Monthly payment amount in INR)
- `interestRate`: Float (Interest rate: `0.0` for 0% interest, `9.5`–`10.5` for standard tiers)
- `cashbackAmount`: Int (Additional instant cashback reward)
- `cashbackNote`: String (Cashback offer eligibility details)
- `fundedBy`: String (Funding backing note: `Mutual Fund SIP`)

---

## 🌱 Seed Dataset Specification

The seed script (`prisma/seed.ts` and `lib/seedData.ts`) pre-populates the database with **7 flagship devices**, each featuring multiple color finishes, storage options, distinct high-res image URLs, and mutual-fund backed EMI tiers:

1. **vivo X300 Pro** (`slug: vivo-x300-pro`) — ZEISS optics, Dimensity 9400, Crimson Red & Titanium Black finishes (Starting ₹89,999).
2. **iQOO 13 5G** (`slug: iqoo-13-5g`) — Snapdragon 8 Elite, 2K 144Hz AMOLED, Legend Mint & Alpha Black finishes (Starting ₹54,999).
3. **Motorola Razr 50 Ultra** (`slug: motorola-razr-50-ultra`) — 4.0" pOLED external screen, Peach Fuzz White & Midnight Blue flip finishes (Starting ₹89,999).
4. **iPad Pro M4 (11-inch)** (`slug: ipad-pro-m4-11`) — Ultra Retina XDR Tandem OLED, Space Black & Silver finishes (Starting ₹94,900).
5. **iPhone 17 Pro** (`slug: iphone-17-pro`) — Aerospace titanium frame, A19 Pro chip, Orange & Silver finishes (Starting ₹1,27,400).
6. **Samsung Galaxy S25 Ultra** (`slug: samsung-galaxy-s25-ultra`) — Galaxy AI & S-Pen, Titanium Black & Titanium Gray finishes (Starting ₹1,19,999).
7. **OnePlus 13** (`slug: oneplus-13`) — Hasselblad camera, 6000mAh Glacier battery, Midnight Ocean & Emerald Green finishes (Starting ₹64,999).

---

## 🔌 API Endpoint Specifications

### 1. `GET /api/products`
Fetches a list of all catalog products with representative thumbnails, variant counts, minimum selling price, and maximum MRP.

#### Example Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-vivo-x300-pro",
      "slug": "vivo-x300-pro",
      "name": "vivo X300 Pro",
      "brand": "vivo",
      "description": "Co-engineered with ZEISS optics, featuring 200MP APO Telephoto camera...",
      "thumbnail": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
      "minPrice": 89999,
      "maxMrp": 99999,
      "variantCount": 2
    }
  ]
}
```

---

### 2. `GET /api/products/:slug`
Fetches complete product details nested with all variants, image URLs, prices, and valid EMI plan tiers.

#### Example Response:
```json
{
  "success": true,
  "data": {
    "id": "prod-vivo-x300-pro",
    "slug": "vivo-x300-pro",
    "name": "vivo X300 Pro",
    "brand": "vivo",
    "description": "Co-engineered with ZEISS optics...",
    "variants": [
      {
        "id": "var-vx300-256-red",
        "label": "256GB / Crimson Red",
        "storage": "256GB",
        "color": "Crimson Red",
        "imageUrl": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
        "mrp": 99999,
        "price": 89999,
        "emiPlans": [
          {
            "id": "emi-vx300-256r-3m",
            "tenureMonths": 3,
            "monthlyAmount": 29999,
            "interestRate": 0,
            "cashbackAmount": 5000,
            "cashbackNote": "Additional cashback of ₹5,000 on SBI/HDFC",
            "fundedBy": "Mutual Fund SIP"
          }
        ]
      }
    ]
  }
}
```

---

### 3. `POST /api/products` (Admin Endpoint)
Creates a new product with custom variants and EMI plans directly in the database.

#### Example Request Payload:
```json
{
  "name": "Google Pixel 9 Pro",
  "slug": "google-pixel-9-pro",
  "brand": "Google",
  "description": "Engineered by Google with Gemini AI...",
  "variants": [
    {
      "label": "128GB / Obsidian",
      "storage": "128GB",
      "color": "Obsidian",
      "imageUrl": "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      "mrp": 109999,
      "price": 99999,
      "stock": 30,
      "emiPlans": [
        {
          "tenureMonths": 6,
          "monthlyAmount": 16666,
          "interestRate": 0,
          "cashbackAmount": 5000,
          "cashbackNote": "Instant cashback of ₹5,000"
        }
      ]
    }
  ]
}
```

---

## 🎨 Visual Identity & UI Design Features

- **Distinct Palette**: Deep Teal (`#0F6D66`), Warm Amber-Coral (`#FF7A45`), Sage Green (`#3E8E5A`), Soft Warm Background (`#FBF7F2`).
- **Product Stage & Hover Effect**: Images rendered inside soft gradient panels with a smooth zoom-out lens transition on hover.
- **Selectable EMI Radio Cards**: EMI plan options styled with teal selection highlights, checkmark badges, 0% interest tags, and cashback notes.
- **Interactive E-Commerce Tools**: Live pincode delivery checker, verified seller badge, trust badges grid, and collapsible specs grid.
- **Sticky Buy CTA**: Persistent checkout bar displaying selected plan summary and confirmation modal dialog.
