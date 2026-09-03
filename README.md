# EasyEMI — Product Catalog & EMI Installment Application

**EasyEMI** is a full-stack web application designed for browsing flagship consumer electronics and selecting flexible, mutual-fund backed monthly installment (EMI) plans. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Prisma ORM with PostgreSQL.

---

## Live Deployment

- **Deployment URL**: `https://easy-emi-catalog.vercel.app` *(Placeholder — to be updated upon live Vercel deployment)*

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router), TypeScript
- **Styling**: Tailwind CSS (Custom palette: `#0F6D66` Deep Teal, `#FF7A45` Warm Coral, `#FBF7F2` Warm Off-White, `#3E8E5A` Sage Green)
- **Backend API**: Next.js Route Handlers (`app/api/**/route.ts`)
- **ORM**: Prisma ORM
- **Database**: PostgreSQL (Neon connection string in `DATABASE_URL`)
- **Deployment**: Vercel ready (`vercel build`)

---

## 🚀 Setup & Local Execution Instructions

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and add your PostgreSQL database URL:
```bash
cp .env.example .env
```
Example `.env`:
```env
DATABASE_URL="postgresql://username:password@ep-example.us-east-2.aws.neon.tech/easyemi?sslmode=require"
```

### 3. Prisma Client Generation & Database Migration
```bash
# Generate Prisma Client
npx prisma generate

# Apply Database Migration
npx prisma db push
# or npx prisma migrate dev --name init
```

### 4. Seed Database
```bash
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Schema Explanation

The relational data model consists of three entities:

```
[ Product ] 1 ─── < Variant ] 1 ─── < EmiPlan ]
```

1. **`Product`**: Represents the top-level device model (e.g. *iPhone 17 Pro*, *Samsung Galaxy S25 Ultra*, *OnePlus 13*).
   - Key attributes: `id`, `slug` (unique URI slug), `name`, `brand`, `description`, `createdAt`.
2. **`Variant`**: Represents specific storage & color configurations of a product (e.g. *256GB / Orange*).
   - Key attributes: `id`, `productId` (foreign key to Product), `label`, `storage`, `color`, `imageUrl`, `mrp`, `price`, `stock`.
3. **`EmiPlan`**: Represents individual monthly installment options available for a specific variant.
   - Key attributes: `id`, `variantId` (foreign key to Variant), `tenureMonths` (3, 6, 12, 24, 36, 48, 60), `monthlyAmount`, `interestRate` (0% or interest-bearing), `cashbackAmount`, `cashbackNote`, `fundedBy`.

---

## 🔌 API Endpoint Specifications

### 1. `GET /api/products`
Returns a list of all products with brand name, URI slug, representative thumbnail, minimum variant price, and max MRP.

#### Example Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "prod-iphone-17-pro",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "description": "The ultimate iPhone engineered with an aerospace-grade titanium frame...",
      "thumbnail": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "minPrice": 127400,
      "maxMrp": 134900,
      "variantCount": 3
    }
  ]
}
```

---

### 2. `GET /api/products/:slug`
Returns complete product details nested with all available variants and their respective EMI installment plans.

#### Example Response:
```json
{
  "success": true,
  "data": {
    "id": "prod-iphone-17-pro",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "brand": "Apple",
    "description": "The ultimate iPhone engineered with an aerospace-grade titanium frame...",
    "createdAt": "2026-01-15T00:00:00.000Z",
    "variants": [
      {
        "id": "var-iphone-17-256-orange",
        "productId": "prod-iphone-17-pro",
        "label": "256GB / Orange",
        "storage": "256GB",
        "color": "Orange",
        "imageUrl": "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
        "mrp": 134900,
        "price": 127400,
        "stock": 50,
        "emiPlans": [
          {
            "id": "emi-ip17-256o-3m",
            "variantId": "var-iphone-17-256-orange",
            "tenureMonths": 3,
            "monthlyAmount": 42467,
            "interestRate": 0,
            "cashbackAmount": 7500,
            "cashbackNote": "Additional cashback of ₹7,500",
            "fundedBy": "Mutual Fund SIP"
          },
          {
            "id": "emi-ip17-256o-36m",
            "variantId": "var-iphone-17-256-orange",
            "tenureMonths": 36,
            "monthlyAmount": 4297,
            "interestRate": 10.5,
            "cashbackAmount": 7500,
            "cashbackNote": "Additional cashback of ₹7,500",
            "fundedBy": "Mutual Fund SIP"
          }
        ]
      }
    ]
  }
}
```

---

## 🎨 Visual Identity & UI Design Features

- **Distinct Palette**: Deep Teal (`#0F6D66`), Warm Amber-Coral (`#FF7A45`), Sage Green (`#3E8E5A`), Soft Warm Background (`#FBF7F2`).
- **Product Presentation**: Product photos rendered against a soft color-wash gradient box.
- **Interactive Radio Cards**: EMI plans displayed as selectable radio cards with active teal border highlights, checkmark badges, and 0% interest badges.
- **Sticky Buy CTA**: Interactive button displaying selected plan breakdown with click confirmation pop-up.
- **Responsive Layout**: Stacked view on mobile devices, two-column layout on desktop viewports.
