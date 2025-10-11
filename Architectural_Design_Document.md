# Architectural Design Document (ADD)
## UniCart - E-Commerce Platform

**Version:** 1.0  
**Date:** October 9, 2025  
**Project Name:** UniCart  
**Document Type:** Architectural Design Document  
**Based on:** BRD v1.0, UI/UX Wireframes v1.0

---

## Table of Contents
1. [Introduction](#1-introduction)
2. [Architecture Overview](#2-architecture-overview)
3. [Application Architecture](#3-application-architecture)
4. [Data Architecture](#4-data-architecture)
5. [Technology Stack](#5-technology-stack)
6. [Security Architecture](#6-security-architecture)
7. [Deployment Architecture](#7-deployment-architecture)
8. [Non-Functional Considerations](#8-non-functional-considerations)

---

## 1. Introduction

### 1.1 Purpose of the System

UniCart is a modern, scalable e-commerce platform designed to provide a seamless Amazon-like shopping experience. The system enables:

- **Customers:** Browse products, add to cart, complete secure purchases, track orders, write reviews
- **Administrators:** Manage products, inventory, orders, customers, and view analytics
- **Business:** Process payments securely, manage logistics, analyze sales data

**Primary Goals:**
- Support 10,000+ concurrent users
- Achieve <3 second page load times
- Ensure 99.9% uptime
- Process payments securely with PCI compliance
- Enable real-time inventory management
- Provide mobile-responsive experience (60%+ mobile traffic)

### 1.2 High-Level Description

UniCart is built as a **modern full-stack web application** using:
- **Frontend:** Next.js 14 with React 18, TypeScript, and Tailwind CSS
- **Backend:** Next.js API Routes (serverless architecture)
- **Database:** PostgreSQL for relational data
- **State Management:** Zustand for client-side state
- **Authentication:** JWT-based with HttpOnly cookies
- **Payment Processing:** Stripe integration
- **Deployment:** Vercel hosting with CDN

**Architecture Pattern:** Monolithic application with serverless functions (Next.js App Router)

### 1.3 Document Scope

This document provides:
- Complete system architecture design
- Component interactions and data flows
- Technology stack justification
- Security implementation details
- Deployment and scaling strategies
- Performance and reliability considerations

**Intended Audience:** Development team, DevOps engineers, QA team, technical stakeholders

---

## 2. Architecture Overview

### 2.1 System Architecture (High-Level)

UniCart follows a **Three-Tier Architecture** pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION TIER                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Client Layer (Browser/Mobile/Tablet)                    │  │
│  │  - React 18 Components                                   │  │
│  │  - Next.js 14 App Router (SSR/CSR)                      │  │
│  │  - Tailwind CSS Styling                                  │  │
│  │  - Zustand State Management                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTPS/REST API
┌─────────────────────────────────────────────────────────────────┐
│                        APPLICATION TIER                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js API Routes (Serverless Functions)              │  │
│  │  - /api/auth/*  (Authentication)                        │  │
│  │  - /api/products/*  (Product Management)                │  │
│  │  - /api/cart/*  (Shopping Cart)                         │  │
│  │  - /api/orders/*  (Order Processing)                    │  │
│  │  - /api/users/*  (User Management)                      │  │
│  │  - /api/admin/*  (Admin Operations)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Business Logic Layer                                    │  │
│  │  - Services (ProductService, OrderService, etc.)        │  │
│  │  - Validation (Zod Schemas)                             │  │
│  │  - Authentication Middleware (JWT Verification)         │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕ Prisma ORM
┌─────────────────────────────────────────────────────────────────┐
│                           DATA TIER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                     │  │
│  │  - Users, Products, Orders, Reviews                      │  │
│  │  - Connection Pooling (PgBouncer)                       │  │
│  │  - Automated Backups                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Redis Cache                                             │  │
│  │  - Session Storage                                       │  │
│  │  - Product Catalog Cache                                 │  │
│  │  - Rate Limiting Data                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Architecture Diagram (Detailed)

```
┌───────────────────────────────────────────────────────────────────────┐
│                            CLIENT DEVICES                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│  │   Desktop   │    │   Mobile    │    │   Tablet    │              │
│  │  (Browser)  │    │  (Browser)  │    │  (Browser)  │              │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘              │
└─────────┼────────────────────┼────────────────────┼───────────────────┘
          │                    │                    │
          └────────────────────┼────────────────────┘
                               │ HTTPS
                    ┌──────────▼──────────┐
                    │   CDN (Vercel Edge) │
                    │  - Static Assets    │
                    │  - Image Optimization│
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
┌─────────▼──────────────────────────────────────────────────────────┐
│                    VERCEL HOSTING PLATFORM                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              NEXT.JS 14 APPLICATION                         │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │  APP ROUTER (React Server Components)                 │ │  │
│  │  │  ┌────────────┐ ┌────────────┐ ┌────────────┐        │ │  │
│  │  │  │  /app/     │ │ /app/      │ │ /app/      │        │ │  │
│  │  │  │  (pages)   │ │ products/  │ │ cart/      │        │ │  │
│  │  │  │  page.tsx  │ │ page.tsx   │ │ page.tsx   │        │ │  │
│  │  │  └────────────┘ └────────────┘ └────────────┘        │ │  │
│  │  │                                                        │ │  │
│  │  │  Server-Side Rendering (SSR) + Static Generation      │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │  CLIENT COMPONENTS (React 18)                         │ │  │
│  │  │  - ProductCard, Cart, Checkout, Auth Forms           │ │  │
│  │  │  - Zustand State: Cart, User, Auth, Products         │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │  API ROUTES (Serverless Functions)                    │ │  │
│  │  │                                                        │ │  │
│  │  │  /api/auth/*          /api/products/*                │ │  │
│  │  │  - register           - getAll                        │ │  │
│  │  │  - login              - getById                       │ │  │
│  │  │  - logout             - create (admin)                │ │  │
│  │  │  - verify-email       - update (admin)                │ │  │
│  │  │                                                        │ │  │
│  │  │  /api/cart/*          /api/orders/*                  │ │  │
│  │  │  - add                - create                        │ │  │
│  │  │  - update             - getById                       │ │  │
│  │  │  - remove             - list                          │ │  │
│  │  │  - clear              - updateStatus (admin)          │ │  │
│  │  │                                                        │ │  │
│  │  │  /api/users/*         /api/admin/*                   │ │  │
│  │  │  - profile            - dashboard                     │ │  │
│  │  │  - addresses          - analytics                     │ │  │
│  │  │  - orders             - inventory                     │ │  │
│  │  │                                                        │ │  │
│  │  │  /api/reviews/*       /api/webhooks/*                │ │  │
│  │  │  - create             - stripe                        │ │  │
│  │  │  - list               - sendgrid                      │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │  MIDDLEWARE LAYER                                      │ │  │
│  │  │  - JWT Authentication Middleware                      │ │  │
│  │  │  - Rate Limiting Middleware                           │ │  │
│  │  │  - CORS Middleware                                    │ │  │
│  │  │  - Error Handling Middleware                          │ │  │
│  │  │  - Request Logging                                    │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │  SERVICES LAYER                                        │ │  │
│  │  │  - ProductService                                      │ │  │
│  │  │  - OrderService                                        │ │  │
│  │  │  - UserService                                         │ │  │
│  │  │  - CartService                                         │ │  │
│  │  │  - PaymentService (Stripe)                            │ │  │
│  │  │  - EmailService (SendGrid)                            │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  │                                                             │  │
│  │  ┌───────────────────────────────────────────────────────┐ │  │
│  │  │  DATA ACCESS LAYER (Prisma ORM)                       │ │  │
│  │  │  - Type-safe queries                                   │ │  │
│  │  │  - Migration management                                │ │  │
│  │  │  - Connection pooling                                  │ │  │
│  │  └───────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
          │                    │                    │
    ┌─────▼─────┐      ┌──────▼──────┐      ┌─────▼────────┐
    │PostgreSQL │      │   Redis     │      │  External    │
    │ Database  │      │   Cache     │      │  Services    │
    │           │      │             │      │              │
    │ - Users   │      │ - Sessions  │      │ • Stripe     │
    │ - Products│      │ - Cart Data │      │ • SendGrid   │
    │ - Orders  │      │ - Cache     │      │ • Cloudinary │
    │ - Reviews │      │ - Rate Limit│      │ • Shippo     │
    └───────────┘      └─────────────┘      └──────────────┘
```

### 2.3 Component Interactions

**User Request Flow:**

```
1. User Request (Browser)
   ↓
2. CDN (Vercel Edge) - Serve static assets or forward to server
   ↓
3. Next.js App Router - SSR/CSR rendering
   ↓
4. Middleware Layer - Auth check, rate limiting, CORS
   ↓
5. API Route Handler - Process request
   ↓
6. Service Layer - Business logic
   ↓
7. Prisma ORM - Database query
   ↓
8. PostgreSQL - Fetch/update data
   ↓
9. Response flows back up the chain
   ↓
10. React Components - Render UI
```

**Order Processing Flow:**

```
Customer Add to Cart → Zustand Store (client-side)
                    ↓
                Proceed to Checkout
                    ↓
        API: /api/cart/checkout (validate stock)
                    ↓
            Shipping Address Entry
                    ↓
        API: /api/orders/create (create pending order)
                    ↓
        Stripe Payment (client-side Stripe.js)
                    ↓
        API: /api/orders/process-payment
                    ↓
        Stripe API: Charge customer
                    ↓
        Update Order Status: "paid"
                    ↓
        Update Inventory: Decrease stock
                    ↓
        SendGrid: Send confirmation email
                    ↓
        Webhook: /api/webhooks/stripe (handle async events)
                    ↓
        Update Order Status: "confirmed"
                    ↓
        Order Confirmation Page
```

---

## 3. Application Architecture

### 3.1 Frontend Design

#### 3.1.1 Technology Stack

- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **HTTP Client:** Native Fetch API

#### 3.1.2 Folder Structure

```
/src
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (customer)/               # Customer pages group
│   │   ├── page.tsx              # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx          # Product listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Product detail
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   ├── shipping/
│   │   │   ├── payment/
│   │   │   └── confirmation/
│   │   ├── account/
│   │   │   ├── page.tsx          # Dashboard
│   │   │   ├── orders/
│   │   │   ├── profile/
│   │   │   ├── addresses/
│   │   │   └── wishlist/
│   │   └── layout.tsx
│   │
│   ├── (admin)/                  # Admin panel group
│   │   ├── admin/
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── customers/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   └── layout.tsx
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── users/
│   │   ├── admin/
│   │   └── webhooks/
│   │
│   ├── layout.tsx                # Root layout
│   └── error.tsx                 # Error boundary
│
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── features/                 # Feature-specific components
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductFilter.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   └── ...
│   └── shared/                   # Shared components
│
├── lib/                          # Utilities and helpers
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # Auth utilities
│   ├── utils.ts                  # Common utilities
│   └── constants.ts
│
├── store/                        # Zustand stores
│   ├── cartStore.ts
│   ├── userStore.ts
│   ├── authStore.ts
│   └── productStore.ts
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useDebounce.ts
│
├── types/                        # TypeScript types
│   ├── index.ts
│   ├── product.ts
│   ├── order.ts
│   └── user.ts
│
├── styles/                       # Global styles
│   └── globals.css
│
└── middleware.ts                 # Next.js middleware
```

#### 3.1.3 State Management Architecture

**Zustand Stores:**

```typescript
// Cart Store
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
}

// User Store
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Auth Store
interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
```

#### 3.1.4 Rendering Strategy

- **Homepage:** Static Site Generation (SSG) with ISR (revalidate every 60s)
- **Product Listing:** Server-Side Rendering (SSR) with caching
- **Product Detail:** SSR with ISR
- **Cart:** Client-Side Rendering (CSR)
- **Checkout:** CSR with protected routes
- **User Account:** SSR with authentication check
- **Admin Panel:** SSR with admin role check

### 3.2 Backend Design

#### 3.2.1 API Architecture

**RESTful API Design with Next.js API Routes**

**Authentication APIs:**
```
POST   /api/auth/register        - Create new user account
POST   /api/auth/login           - Authenticate user
POST   /api/auth/logout          - End user session
POST   /api/auth/forgot-password - Request password reset
POST   /api/auth/reset-password  - Reset password with token
POST   /api/auth/verify-email    - Verify email address
GET    /api/auth/me              - Get current user
```

**Product APIs:**
```
GET    /api/products              - List products (with filters, pagination)
GET    /api/products/:id          - Get product by ID
GET    /api/products/slug/:slug   - Get product by slug
GET    /api/products/search       - Search products
POST   /api/products              - Create product (admin)
PUT    /api/products/:id          - Update product (admin)
DELETE /api/products/:id          - Delete product (admin)
```

**Cart APIs:**
```
GET    /api/cart                  - Get user's cart
POST   /api/cart/add              - Add item to cart
PUT    /api/cart/update           - Update cart item quantity
DELETE /api/cart/remove/:id       - Remove item from cart
POST   /api/cart/clear            - Clear cart
```

**Order APIs:**
```
GET    /api/orders                - List user's orders
GET    /api/orders/:id            - Get order details
POST   /api/orders                - Create order
PUT    /api/orders/:id/cancel     - Cancel order
POST   /api/orders/payment        - Process payment
```

**User APIs:**
```
GET    /api/users/profile         - Get user profile
PUT    /api/users/profile         - Update profile
GET    /api/users/addresses       - List addresses
POST   /api/users/addresses       - Add address
PUT    /api/users/addresses/:id   - Update address
DELETE /api/users/addresses/:id   - Delete address
GET    /api/users/wishlist        - Get wishlist
POST   /api/users/wishlist        - Add to wishlist
```

**Admin APIs:**
```
GET    /api/admin/dashboard       - Get dashboard metrics
GET    /api/admin/orders          - List all orders
PUT    /api/admin/orders/:id      - Update order status
GET    /api/admin/users           - List users
GET    /api/admin/analytics       - Get analytics data
POST   /api/admin/coupons         - Create coupon
```

**Review APIs:**
```
GET    /api/reviews/product/:id   - Get product reviews
POST   /api/reviews               - Create review
PUT    /api/reviews/:id           - Update review
DELETE /api/reviews/:id           - Delete review
```

**Webhook APIs:**
```
POST   /api/webhooks/stripe       - Stripe payment events
POST   /api/webhooks/shippo       - Shipping events
```

#### 3.2.2 Service Layer

```typescript
// ProductService
class ProductService {
  async getProducts(filters: ProductFilters): Promise<Product[]>
  async getProductById(id: string): Promise<Product>
  async createProduct(data: CreateProductDto): Promise<Product>
  async updateProduct(id: string, data: UpdateProductDto): Promise<Product>
  async deleteProduct(id: string): Promise<void>
  async updateStock(id: string, quantity: number): Promise<void>
}

// OrderService
class OrderService {
  async createOrder(data: CreateOrderDto): Promise<Order>
  async getOrderById(id: string): Promise<Order>
  async getUserOrders(userId: string): Promise<Order[]>
  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order>
  async processPayment(orderId: string, paymentData: PaymentData): Promise<void>
  async cancelOrder(id: string): Promise<void>
}

// UserService
class UserService {
  async createUser(data: CreateUserDto): Promise<User>
  async getUserById(id: string): Promise<User>
  async updateProfile(id: string, data: UpdateUserDto): Promise<User>
  async addAddress(userId: string, address: AddressDto): Promise<Address>
  async updateAddress(id: string, address: AddressDto): Promise<Address>
}

// PaymentService
class PaymentService {
  async createPaymentIntent(amount: number): Promise<string>
  async confirmPayment(paymentIntentId: string): Promise<boolean>
  async processRefund(paymentIntentId: string, amount: number): Promise<void>
}

// EmailService
class EmailService {
  async sendVerificationEmail(email: string, token: string): Promise<void>
  async sendPasswordResetEmail(email: string, token: string): Promise<void>
  async sendOrderConfirmation(order: Order): Promise<void>
  async sendShippingNotification(order: Order): Promise<void>
}
```

#### 3.2.3 Middleware

```typescript
// Authentication Middleware
export async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

// Rate Limiting Middleware
export async function rateLimitMiddleware(req: NextRequest) {
  const ip = req.ip || 'unknown';
  const limit = await checkRateLimit(ip);
  
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' }, 
      { status: 429 }
    );
  }
  
  return NextResponse.next();
}

// Admin Authorization Middleware
export async function adminMiddleware(req: NextRequest) {
  if (req.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.next();
}
```

### 3.3 APIs and Integrations

#### 3.3.1 Payment Integration (Stripe)

```typescript
// Stripe Payment Flow
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
async function createPaymentIntent(amount: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  });
  
  return paymentIntent.client_secret;
}

// Webhook Handler
export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;
    }
    
    return NextResponse.json({ received: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
```

#### 3.3.2 Email Integration (SendGrid)

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOrderConfirmation(order: Order, email: string) {
  const msg = {
    to: email,
    from: 'noreply@unicart.com',
    templateId: process.env.SENDGRID_ORDER_CONFIRMATION_TEMPLATE,
    dynamicTemplateData: {
      orderNumber: order.orderNumber,
      items: order.items,
      total: order.total,
      estimatedDelivery: order.estimatedDelivery,
    },
  };
  
  await sgMail.send(msg);
}
```

#### 3.3.3 Image Storage (Cloudinary)

```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadProductImage(file: File) {
  const result = await cloudinary.uploader.upload(file.path, {
    folder: 'products',
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto' },
      { fetch_format: 'auto' },
    ],
  });
  
  return result.secure_url;
}
```

#### 3.3.4 Shipping Integration (Shippo)

```typescript
import shippo from 'shippo';

const shippoClient = shippo(process.env.SHIPPO_API_KEY);

async function getShippingRates(address: Address, weight: number) {
  const shipment = await shippoClient.shipment.create({
    address_from: WAREHOUSE_ADDRESS,
    address_to: address,
    parcels: [{
      length: '10',
      width: '8',
      height: '6',
      distance_unit: 'in',
      weight: weight.toString(),
      mass_unit: 'lb',
    }],
  });
  
  return shipment.rates;
}
```

---

## 4. Data Architecture

### 4.1 Database Design (PostgreSQL)

#### 4.1.1 Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│    users     │       │  addresses   │       │    carts     │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │──1:M──│ id (PK)      │       │ id (PK)      │
│ email        │       │ user_id (FK) │   ┌──│ user_id (FK) │
│ password_hash│       │ address_line1│   │   │ product_id   │
│ first_name   │       │ city         │   │   │ quantity     │
│ last_name    │       │ state        │   │   └──────────────┘
│ role         │       │ postal_code  │   │          │
└──────┬───────┘       └──────────────┘   │          │
       │                                   │          │
       │1:M                                │1:M       │M:1
       │                                   │          │
┌──────▼───────┐       ┌──────────────┐   │   ┌──────▼────────┐
│   orders     │       │ order_items  │   │   │   products    │
├──────────────┤       ├──────────────┤   │   ├───────────────┤
│ id (PK)      │──1:M──│ id (PK)      │   │   │ id (PK)       │
│ user_id (FK) │       │ order_id (FK)│───┘   │ name          │
│ order_number │       │ product_id   │───────│ slug          │
│ status       │       │ quantity     │   M:1 │ description   │
│ total_amount │       │ unit_price   │       │ price         │
│ payment_status       └──────────────┘       │ stock_quantity│
│ shipping_address                            │ category_id   │
└──────┬───────┘                              │ is_active     │
       │                                      └───────┬───────┘
       │1:M                                           │
       │                                              │1:M
┌──────▼───────┐       ┌──────────────┐              │
│   reviews    │       │  categories  │              │
├──────────────┤       ├──────────────┤              │
│ id (PK)      │   ┌───│ id (PK)      │              │
│ product_id   │───┘   │ name         │              │M:1
│ user_id (FK) │       │ slug         │              │
│ rating       │       │ parent_id    │              │
│ title        │       └──────────────┘              │
│ comment      │                                     │
└──────────────┘                                     │
       │                                             │
       │M:1                                          │
       │                                             │
┌──────▼───────┐       ┌──────────────┐             │
│ review_images│       │product_images│─────────────┘
├──────────────┤       ├──────────────┤        1:M
│ id (PK)      │       │ id (PK)      │
│ review_id    │       │ product_id   │
│ image_url    │       │ image_url    │
└──────────────┘       │ is_primary   │
                       └──────────────┘

┌──────────────┐       ┌──────────────┐
│  wishlists   │       │product_      │
├──────────────┤       │  variants    │
│ id (PK)      │       ├──────────────┤
│ user_id (FK) │       │ id (PK)      │
│ product_id   │       │ product_id   │
└──────────────┘       │ variant_name │
                       │ price        │
┌──────────────┐       │ stock_qty    │
│   coupons    │       │ attributes   │
├──────────────┤       └──────────────┘
│ id (PK)      │
│ code         │
│ discount_type│
│ discount_value
│ valid_until  │
└──────────────┘
```

#### 4.1.2 Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  firstName     String?   @map("first_name")
  lastName      String?   @map("last_name")
  phone         String?
  role          String    @default("customer")
  emailVerified Boolean   @default(false) @map("email_verified")
  isActive      Boolean   @default(true) @map("is_active")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  lastLogin     DateTime? @map("last_login")

  addresses Address[]
  orders    Order[]
  reviews   Review[]
  wishlists Wishlist[]
  carts     Cart[]

  @@map("users")
}

model Address {
  id           String   @id @default(uuid())
  userId       String   @map("user_id")
  addressType  String?  @map("address_type")
  fullName     String?  @map("full_name")
  addressLine1 String   @map("address_line1")
  addressLine2 String?  @map("address_line2")
  city         String
  state        String?
  postalCode   String   @map("postal_code")
  country      String   @default("US")
  phone        String?
  isDefault    Boolean  @default(false) @map("is_default")
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("addresses")
}

model Category {
  id           String     @id @default(uuid())
  name         String
  slug         String     @unique
  description  String?
  parentId     String?    @map("parent_id")
  imageUrl     String?    @map("image_url")
  isActive     Boolean    @default(true) @map("is_active")
  displayOrder Int        @default(0) @map("display_order")
  createdAt    DateTime   @default(now()) @map("created_at")
  updatedAt    DateTime   @updatedAt @map("updated_at")

  parent   Category?  @relation("CategoryHierarchy", fields: [parentId], references: [id])
  children Category[] @relation("CategoryHierarchy")
  products Product[]

  @@map("categories")
}

model Product {
  id                String   @id @default(uuid())
  name              String
  slug              String   @unique
  description       String?
  shortDescription  String?  @map("short_description")
  categoryId        String?  @map("category_id")
  brand             String?
  sku               String?  @unique
  price             Decimal  @db.Decimal(10, 2)
  comparePrice      Decimal? @map("compare_price") @db.Decimal(10, 2)
  costPrice         Decimal? @map("cost_price") @db.Decimal(10, 2)
  stockQuantity     Int      @default(0) @map("stock_quantity")
  lowStockThreshold Int      @default(10) @map("low_stock_threshold")
  weight            Decimal? @db.Decimal(8, 2)
  dimensions        String?
  isActive          Boolean  @default(true) @map("is_active")
  isFeatured        Boolean  @default(false) @map("is_featured")
  ratingAverage     Decimal  @default(0.0) @map("rating_average") @db.Decimal(2, 1)
  ratingCount       Int      @default(0) @map("rating_count")
  viewCount         Int      @default(0) @map("view_count")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")

  category       Category?        @relation(fields: [categoryId], references: [id])
  images         ProductImage[]
  variants       ProductVariant[]
  orderItems     OrderItem[]
  reviews        Review[]
  wishlists      Wishlist[]
  carts          Cart[]

  @@map("products")
}

model ProductImage {
  id           String   @id @default(uuid())
  productId    String   @map("product_id")
  imageUrl     String   @map("image_url")
  altText      String?  @map("alt_text")
  displayOrder Int      @default(0) @map("display_order")
  isPrimary    Boolean  @default(false) @map("is_primary")
  createdAt    DateTime @default(now()) @map("created_at")

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@map("product_images")
}

model ProductVariant {
  id            String   @id @default(uuid())
  productId     String   @map("product_id")
  variantName   String?  @map("variant_name")
  sku           String?  @unique
  price         Decimal? @db.Decimal(10, 2)
  stockQuantity Int      @default(0) @map("stock_quantity")
  attributes    Json?
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]
  carts      Cart[]

  @@map("product_variants")
}

model Order {
  id              String   @id @default(uuid())
  orderNumber     String   @unique @map("order_number")
  userId          String?  @map("user_id")
  guestEmail      String?  @map("guest_email")
  status          String   @default("pending")
  paymentStatus   String   @default("pending") @map("payment_status")
  paymentMethod   String?  @map("payment_method")
  paymentIntentId String?  @map("payment_intent_id")
  subtotal        Decimal  @db.Decimal(10, 2)
  taxAmount       Decimal  @default(0) @map("tax_amount") @db.Decimal(10, 2)
  shippingAmount  Decimal  @default(0) @map("shipping_amount") @db.Decimal(10, 2)
  discountAmount  Decimal  @default(0) @map("discount_amount") @db.Decimal(10, 2)
  totalAmount     Decimal  @map("total_amount") @db.Decimal(10, 2)
  shippingAddress Json?    @map("shipping_address")
  billingAddress  Json?    @map("billing_address")
  trackingNumber  String?  @map("tracking_number")
  shippingCarrier String?  @map("shipping_carrier")
  shippedAt       DateTime? @map("shipped_at")
  deliveredAt     DateTime? @map("delivered_at")
  notes           String?
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  user   User?       @relation(fields: [userId], references: [id])
  items  OrderItem[]
  reviews Review[]

  @@map("orders")
}

model OrderItem {
  id          String   @id @default(uuid())
  orderId     String   @map("order_id")
  productId   String?  @map("product_id")
  variantId   String?  @map("variant_id")
  productName String   @map("product_name")
  productSku  String?  @map("product_sku")
  variantName String?  @map("variant_name")
  quantity    Int
  unitPrice   Decimal  @map("unit_price") @db.Decimal(10, 2)
  totalPrice  Decimal  @map("total_price") @db.Decimal(10, 2)
  createdAt   DateTime @default(now()) @map("created_at")

  order   Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product?        @relation(fields: [productId], references: [id])
  variant ProductVariant? @relation(fields: [variantId], references: [id])

  @@map("order_items")
}

model Review {
  id                 String   @id @default(uuid())
  productId          String   @map("product_id")
  userId             String?  @map("user_id")
  orderId            String?  @map("order_id")
  rating             Int
  title              String?
  comment            String?
  isVerifiedPurchase Boolean  @default(false) @map("is_verified_purchase")
  isApproved         Boolean  @default(false) @map("is_approved")
  helpfulCount       Int      @default(0) @map("helpful_count")
  createdAt          DateTime @default(now()) @map("created_at")
  updatedAt          DateTime @updatedAt @map("updated_at")

  product Product       @relation(fields: [productId], references: [id], onDelete: Cascade)
  user    User?         @relation(fields: [userId], references: [id])
  order   Order?        @relation(fields: [orderId], references: [id])
  images  ReviewImage[]

  @@map("reviews")
}

model ReviewImage {
  id        String   @id @default(uuid())
  reviewId  String   @map("review_id")
  imageUrl  String   @map("image_url")
  createdAt DateTime @default(now()) @map("created_at")

  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@map("review_images")
}

model Wishlist {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  productId String   @map("product_id")
  createdAt DateTime @default(now()) @map("created_at")

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@map("wishlists")
}

model Coupon {
  id                String    @id @default(uuid())
  code              String    @unique
  description       String?
  discountType      String    @map("discount_type")
  discountValue     Decimal   @map("discount_value") @db.Decimal(10, 2)
  minOrderAmount    Decimal?  @map("min_order_amount") @db.Decimal(10, 2)
  maxDiscountAmount Decimal?  @map("max_discount_amount") @db.Decimal(10, 2)
  usageLimit        Int?      @map("usage_limit")
  usedCount         Int       @default(0) @map("used_count")
  validFrom         DateTime? @map("valid_from")
  validUntil        DateTime? @map("valid_until")
  isActive          Boolean   @default(true) @map("is_active")
  createdAt         DateTime  @default(now()) @map("created_at")

  @@map("coupons")
}

model Cart {
  id        String   @id @default(uuid())
  userId    String   @map("user_id")
  productId String   @map("product_id")
  variantId String?  @map("variant_id")
  quantity  Int      @default(1)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  user    User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product         @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant ProductVariant? @relation(fields: [variantId], references: [id], onDelete: Cascade)

  @@unique([userId, productId, variantId])
  @@map("carts")
}
```

### 4.2 Data Flow

#### 4.2.1 Product Browsing Flow

```
1. User visits homepage
   ↓
2. Next.js SSG loads cached page
   ↓
3. Featured products fetched from Redis cache (if available)
   ↓
4. If cache miss → Query PostgreSQL via Prisma
   ↓
5. Store in Redis cache (TTL: 5 minutes)
   ↓
6. Return data to client
   ↓
7. React components render product grid
```

#### 4.2.2 Order Creation Flow

```
1. User completes checkout form
   ↓
2. POST /api/orders (with cart items, shipping, payment)
   ↓
3. Validate cart items availability
   ↓
4. Create order in PostgreSQL (status: pending)
   ↓
5. Create Stripe Payment Intent
   ↓
6. Return client_secret to client
   ↓
7. Client confirms payment with Stripe.js
   ↓
8. Stripe webhook: payment_intent.succeeded
   ↓
9. Update order status: "paid"
   ↓
10. Decrease product stock quantities
    ↓
11. Clear user's cart
    ↓
12. Send confirmation email via SendGrid
    ↓
13. Return order confirmation
```

#### 4.2.3 Real-time Inventory Update

```
Order Placed → Update stock_quantity
              ↓
           Check if stock < low_stock_threshold
              ↓
           If true → Create admin notification
              ↓
           Invalidate product cache in Redis
              ↓
           Next product view fetches updated data
```

---

## 5. Technology Stack

### 5.1 Complete Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend Framework** | Next.js | 14.x | React framework with SSR, SSG, API routes |
| **UI Library** | React | 18.x | Component-based UI development |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS framework |
| **State Management** | Zustand | 4.x | Lightweight state management |
| **Form Handling** | React Hook Form | 7.x | Performant form validation |
| **Validation** | Zod | 3.x | Schema validation |
| **Database** | PostgreSQL | 15.x | Relational database |
| **ORM** | Prisma | 5.x | Type-safe database client |
| **Cache** | Redis | 7.x | In-memory cache and session storage |
| **Authentication** | JWT | - | Token-based authentication |
| **Password Hashing** | bcrypt | - | Secure password hashing |
| **Payment** | Stripe | Latest | Payment processing |
| **Email** | SendGrid | Latest | Transactional emails |
| **Image Storage** | Cloudinary | Latest | Image CDN and optimization |
| **Shipping** | Shippo | Latest | Shipping rate calculation |
| **Hosting** | Vercel | Latest | Serverless deployment |
| **CDN** | Vercel Edge Network | - | Global content delivery |
| **Error Tracking** | Sentry | Latest | Error monitoring and logging |
| **Analytics** | Google Analytics | GA4 | User behavior tracking |
| **Testing** | Jest | 29.x | Unit testing |
| **E2E Testing** | Playwright | Latest | End-to-end testing |
| **Code Quality** | ESLint | 8.x | Linting |
| **Formatting** | Prettier | 3.x | Code formatting |
| **Version Control** | Git/GitHub | - | Source control |
| **CI/CD** | GitHub Actions | - | Continuous integration/deployment |

### 5.2 Development Tools

- **IDE:** VS Code
- **Package Manager:** npm or pnpm
- **API Testing:** Postman
- **Database Client:** TablePlus / pgAdmin
- **Design:** Figma (for UI/UX mockups)

### 5.3 Environment Variables

```env
# App
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://unicart.com

# Database
DATABASE_URL=postgresql://user:password@host:5432/unicart
DIRECT_URL=postgresql://user:password@host:5432/unicart

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SendGrid
SENDGRID_API_KEY=SG...
SENDGRID_FROM_EMAIL=noreply@unicart.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Shippo
SHIPPO_API_KEY=shippo_test_...

# Sentry
SENTRY_DSN=https://...

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
```

---

## 6. Security Architecture

### 6.1 Authentication and Authorization

#### 6.1.1 Authentication Flow

```
1. User Registration:
   - User submits email + password
   - Validate input (Zod schema)
   - Hash password (bcrypt, 10 rounds)
   - Create user in database
   - Generate email verification token
   - Send verification email
   - Return success message

2. Email Verification:
   - User clicks email link with token
   - Verify token validity and expiration
   - Update user.emailVerified = true
   - Redirect to login

3. User Login:
   - User submits email + password
   - Fetch user from database
   - Compare password hash (bcrypt.compare)
   - If valid:
     * Generate JWT token (HS256)
     * Payload: { userId, email, role, exp }
     * Set HttpOnly cookie with token
     * Update lastLogin timestamp
     * Return user data (without sensitive info)
   - If invalid:
     * Return error
     * Implement rate limiting (max 5 attempts/15 min)

4. Authenticated Requests:
   - Client sends request with cookie
   - Middleware extracts token from cookie
   - Verify JWT signature and expiration
   - If valid:
     * Attach user to request object
     * Proceed to route handler
   - If invalid:
     * Return 401 Unauthorized

5. Logout:
   - Clear HttpOnly cookie
   - Optional: Add token to blacklist (Redis)
   - Return success
```

#### 6.1.2 Authorization (Role-Based Access Control)

```typescript
// Roles
enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  VENDOR = 'vendor'
}

// Authorization Middleware
function authorize(roles: Role[]) {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Usage
app.get('/api/admin/dashboard', 
  authenticate, 
  authorize([Role.ADMIN]), 
  getDashboard
);
```

### 6.2 Data Protection

#### 6.2.1 Encryption

- **In Transit:** TLS 1.3 (HTTPS enforced)
- **At Rest:** 
  - Database: PostgreSQL encryption
  - Passwords: bcrypt hashing (10 rounds)
  - Sensitive fields: AES-256 encryption for PII
- **Cookies:** HttpOnly, Secure, SameSite=Strict

#### 6.2.2 Input Validation

```typescript
// Zod Schema Example
const createProductSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  price: z.number().positive(),
  stockQuantity: z.number().int().nonnegative(),
  categoryId: z.string().uuid(),
  images: z.array(z.string().url()).max(10),
});

// Usage in API route
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = createProductSchema.parse(body);
    // Proceed with validated data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
  }
}
```

#### 6.2.3 SQL Injection Prevention

- Use Prisma ORM (parameterized queries)
- Never concatenate user input into raw SQL
- Validate and sanitize all inputs

```typescript
// Safe (Prisma)
const products = await prisma.product.findMany({
  where: { name: { contains: searchTerm } }
});

// Unsafe (avoid)
const products = await prisma.$queryRaw`
  SELECT * FROM products WHERE name LIKE '%${searchTerm}%'
`;
```

### 6.3 API Security

#### 6.3.1 Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all routes
app.use('/api/', limiter);

// Stricter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

app.use('/api/auth/login', authLimiter);
```

#### 6.3.2 CORS Configuration

```typescript
const corsOptions = {
  origin: [
    'https://unicart.com',
    'https://www.unicart.com',
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''
  ].filter(Boolean),
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

#### 6.3.3 CSRF Protection

```typescript
// Use CSRF tokens for state-changing operations
import csrf from 'csurf';

const csrfProtection = csrf({ cookie: true });

// Apply to forms
app.post('/api/orders', csrfProtection, createOrder);
```

#### 6.3.4 XSS Protection

- Content Security Policy headers
- Sanitize user input
- Use React's automatic escaping
- Set security headers

```typescript
// Next.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com;"
  }
];
```

### 6.4 PCI DSS Compliance

**Payment Security:**
1. **Never store card data** - Use Stripe tokenization
2. **Stripe.js** - Collect payment on client side
3. **Payment Intent Flow** - Server creates intent, client confirms
4. **Webhooks** - Handle async payment events securely

```typescript
// Client-side (Stripe Elements)
const { error, paymentIntent } = await stripe.confirmCardPayment(
  clientSecret,
  {
    payment_method: {
      card: cardElement,
      billing_details: { name: 'Customer Name' }
    }
  }
);

// Server-side (never touch card data)
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  payment_method_types: ['card'],
});
```

### 6.5 GDPR Compliance

**User Rights Implementation:**

1. **Right to Access:**
```typescript
export async function GET(req: Request) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      addresses: true,
      orders: { include: { items: true } },
      reviews: true,
    }
  });
  
  return NextResponse.json(user);
}
```

2. **Right to Erasure:**
```typescript
export async function DELETE(req: Request) {
  // Anonymize instead of hard delete for order history
  await prisma.user.update({
    where: { id: userId },
    data: {
      email: `deleted_${userId}@deleted.com`,
      firstName: 'Deleted',
      lastName: 'User',
      phone: null,
      isActive: false,
    }
  });
  
  // Delete associated data
  await prisma.address.deleteMany({ where: { userId } });
}
```

3. **Consent Management:**
- Cookie consent banner
- Privacy policy page
- Terms of service acceptance
- Email opt-in/opt-out

---

## 7. Deployment Architecture

### 7.1 Hosting Environment

**Platform:** Vercel (Serverless)

**Architecture:**
```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL INFRASTRUCTURE                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Vercel Edge Network (CDN)                            │  │
│  │  - 300+ Global Points of Presence                     │  │
│  │  - Automatic HTTPS                                    │  │
│  │  - DDoS protection                                    │  │
│  └─────────────────┬─────────────────────────────────────┘  │
│                    │                                         │
│  ┌─────────────────▼─────────────────────────────────────┐  │
│  │  Next.js Application (Serverless Functions)           │  │
│  │  - Auto-scaling (0 to ∞)                              │  │
│  │  - Regional deployment (us-east-1)                    │  │
│  │  - 10s timeout per function                          │  │
│  └─────────────────┬─────────────────────────────────────┘  │
└────────────────────┼─────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
┌───────▼──────┐ ┌──▼────────┐ ┌─▼────────────┐
│ PostgreSQL   │ │   Redis   │ │   External   │
│ (Neon/       │ │ (Upstash) │ │   Services   │
│  Supabase)   │ │           │ │ - Stripe     │
│              │ │           │ │ - SendGrid   │
│ - Serverless │ │ - Edge    │ │ - Cloudinary │
│ - Auto-scale │ │ - Global  │ │ - Shippo     │
└──────────────┘ └───────────┘ └──────────────┘
```

### 7.2 Infrastructure Components

#### 7.2.1 Database (Neon/Supabase)

- **Type:** PostgreSQL 15
- **Hosting:** Neon Serverless or Supabase
- **Features:**
  - Connection pooling (PgBouncer)
  - Auto-scaling compute
  - Automated backups (daily)
  - Point-in-time recovery
  - Read replicas (for scaling reads)

#### 7.2.2 Cache (Upstash Redis)

- **Type:** Redis 7
- **Hosting:** Upstash (serverless Redis)
- **Use Cases:**
  - Session storage
  - Product catalog cache
  - Rate limiting data
  - Temporary data (cart for guests)
- **TTL Configuration:**
  - Product cache: 5 minutes
  - User session: 7 days
  - Rate limit: 15 minutes

#### 7.2.3 Storage (Cloudinary)

- **Media Storage:** Product images, review images
- **Features:**
  - Automatic format optimization (WebP)
  - Image resizing and cropping
  - CDN delivery
  - Lazy loading support

### 7.3 Scalability and Performance

#### 7.3.1 Horizontal Scaling

**Serverless Auto-Scaling:**
- Vercel automatically scales functions based on demand
- No configuration needed
- Pay per execution
- Cold start optimization via edge functions

**Database Scaling:**
- Neon: Auto-scales compute units
- Connection pooling prevents connection exhaustion
- Read replicas for read-heavy operations

**Caching Strategy:**
```typescript
// Three-tier caching
1. Browser Cache (static assets)
   - Cache-Control: public, max-age=31536000, immutable

2. CDN Cache (Vercel Edge)
   - Next.js Static Generation
   - Revalidate: 60 seconds

3. Application Cache (Redis)
   - Product listings: 5 minutes
   - User sessions: 7 days
```

#### 7.3.2 Performance Optimization

**Frontend:**
- Code splitting (route-based)
- Image optimization (next/image)
- Lazy loading (React.lazy)
- Tree shaking (Webpack)
- Minification and compression

**Backend:**
- Database query optimization
- Proper indexing
- Connection pooling
- Caching frequent queries

**Monitoring:**
- Vercel Analytics (Web Vitals)
- Sentry (error tracking)
- Custom metrics dashboard

### 7.4 CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                 GITHUB REPOSITORY                            │
│  - main branch (production)                                  │
│  - develop branch (staging)                                  │
│  - feature/* branches                                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Pull Request created
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              GITHUB ACTIONS (CI)                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Checkout code                                   │   │
│  │  2. Setup Node.js                                   │   │
│  │  3. Install dependencies                            │   │
│  │  4. Run linter (ESLint)                            │   │
│  │  5. Run type check (TypeScript)                    │   │
│  │  6. Run unit tests (Jest)                          │   │
│  │  7. Run E2E tests (Playwright)                     │   │
│  │  8. Build application                               │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ All checks pass
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              MERGE TO MAIN/DEVELOP                           │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Auto-trigger deployment
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              VERCEL DEPLOYMENT (CD)                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Detect commit                                   │   │
│  │  2. Build Next.js application                       │   │
│  │  3. Run Prisma migrations                           │   │
│  │  4. Deploy to edge network                          │   │
│  │  5. Run smoke tests                                 │   │
│  │  6. Update DNS (if needed)                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Deployment successful
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              PRODUCTION ENVIRONMENT                          │
│  - Health check monitoring                                   │
│  - Error tracking (Sentry)                                   │
│  - Performance monitoring                                    │
└─────────────────────────────────────────────────────────────┘
```

#### 7.4.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### 7.5 Deployment Environments

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| **Production** | main | unicart.com | Live application |
| **Staging** | develop | staging.unicart.com | Pre-production testing |
| **Preview** | feature/* | preview-[hash].vercel.app | PR previews |
| **Development** | local | localhost:3000 | Local development |

### 7.6 Database Migrations

```bash
# Development
npm run prisma:migrate:dev

# Production
npm run prisma:migrate:deploy

# Generate Prisma Client
npm run prisma:generate
```

**Migration Strategy:**
1. Create migration in dev environment
2. Test migration in staging
3. Review migration SQL
4. Deploy to production during low-traffic window
5. Monitor for errors
6. Rollback plan ready

---

## 8. Non-Functional Considerations

### 8.1 Reliability

#### 8.1.1 Availability Targets

- **System Uptime:** 99.9% (8.76 hours downtime/year)
- **Database Availability:** 99.95%
- **API Response Success Rate:** 99.5%

#### 8.1.2 Fault Tolerance

**Strategies:**
1. **Graceful Degradation:**
   - If Redis cache fails → Fetch from database
   - If image CDN fails → Show placeholder
   - If payment fails → Show error, save cart

2. **Circuit Breaker Pattern:**
```typescript
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  async execute(fn: () => Promise<any>) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > 60000) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= 5) {
      this.state = 'OPEN';
    }
  }
}
```

3. **Retry Logic:**
```typescript
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}
```

#### 8.1.3 Backup and Recovery

**Backup Strategy:**
- **Database:** Daily automated backups, 30-day retention
- **Point-in-time recovery:** 7-day window
- **Code:** Git version control
- **Configuration:** Infrastructure as code

**Recovery Objectives:**
- **RTO (Recovery Time Objective):** < 4 hours
- **RPO (Recovery Point Objective):** < 1 hour

### 8.2 Maintainability

#### 8.2.1 Code Quality

**Standards:**
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- 80%+ test coverage
- Meaningful variable names
- Component documentation

**Code Review Process:**
1. Create feature branch
2. Write tests
3. Submit pull request
4. Automated checks (CI)
5. Peer review (2 approvers)
6. Merge to develop
7. Deploy to staging
8. QA testing
9. Merge to main
10. Deploy to production

#### 8.2.2 Documentation

**Types:**
1. **API Documentation:** OpenAPI/Swagger
2. **Code Comments:** JSDoc for functions
3. **Architecture Docs:** This document
4. **README:** Setup instructions
5. **Changelog:** Version history

#### 8.2.3 Monitoring and Logging

**Application Monitoring:**
- **Sentry:** Error tracking and performance
- **Vercel Analytics:** Web Vitals, page views
- **Custom Dashboard:** Business metrics

**Logging:**
```typescript
// Structured logging
logger.info('Order created', {
  orderId: order.id,
  userId: user.id,
  amount: order.totalAmount,
  timestamp: new Date().toISOString(),
});

logger.error('Payment failed', {
  orderId: order.id,
  error: error.message,
  stack: error.stack,
});
```

**Alerts:**
- Error rate > 1%
- Response time > 3s
- Database connection failures
- Payment failures

### 8.3 Performance

#### 8.3.1 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Page Load Time** | < 3s | First Contentful Paint |
| **Time to Interactive** | < 5s | TTI |
| **API Response Time** | < 500ms | p95 |
| **Database Queries** | < 100ms | p95 |
| **Image Load Time** | < 2s | Largest Contentful Paint |

#### 8.3.2 Optimization Techniques

**Frontend:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- Code splitting
- Image optimization
- Lazy loading
- Prefetching
- Service workers (future)

**Backend:**
- Database indexing
- Query optimization
- Connection pooling
- Caching (Redis)
- Response compression

**Example - Optimized Product Query:**
```typescript
// Bad (N+1 query problem)
const products = await prisma.product.findMany();
for (const product of products) {
  product.images = await prisma.productImage.findMany({
    where: { productId: product.id }
  });
}

// Good (single query with includes)
const products = await prisma.product.findMany({
  include: {
    images: true,
    category: true,
  },
  where: { isActive: true },
  take: 20,
  skip: (page - 1) * 20,
});
```

#### 8.3.3 Load Testing

**Tools:** Artillery, k6

**Scenarios:**
1. **Normal Load:** 1,000 concurrent users
2. **Peak Load:** 5,000 concurrent users
3. **Stress Test:** 10,000+ concurrent users

**Metrics to Track:**
- Response time percentiles (p50, p95, p99)
- Throughput (requests/second)
- Error rate
- Resource utilization (CPU, memory, database connections)

### 8.4 Availability

#### 8.4.1 High Availability Architecture

**Single Points of Failure Mitigation:**
1. **Application:** Serverless auto-scaling (no single instance)
2. **Database:** Managed service with built-in replication
3. **Cache:** Redis cluster with failover
4. **CDN:** Global edge network

#### 8.4.2 Health Checks

```typescript
// Health check endpoint
export async function GET() {
  try {
    // Check database
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Redis
    await redis.ping();
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'up',
        cache: 'up',
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message
    }, { status: 503 });
  }
}
```

#### 8.4.3 Disaster Recovery Plan

**Scenarios:**
1. **Database Failure:**
   - Automatic failover to replica
   - Restore from backup (if needed)
   - RTO: 1 hour

2. **Application Failure:**
   - Rollback to previous deployment
   - RTO: 15 minutes

3. **Complete Outage:**
   - Restore from backups
   - Redeploy application
   - RTO: 4 hours

---

## 9. Appendix

### 9.1 API Endpoint Reference

Complete API reference available at: `/api-docs` (Swagger UI)

### 9.2 Database Schema Diagram

Refer to Section 4.1.1 for complete ER diagram

### 9.3 Deployment Checklist

**Pre-Deployment:**
- [ ] All tests passing
- [ ] Code review approved
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations prepared
- [ ] Backup created

**Deployment:**
- [ ] Run database migrations
- [ ] Deploy application
- [ ] Verify health checks
- [ ] Smoke tests pass
- [ ] Monitor error logs

**Post-Deployment:**
- [ ] Verify critical user flows
- [ ] Check performance metrics
- [ ] Monitor error rates
- [ ] Update changelog
- [ ] Notify stakeholders

### 9.4 Glossary

| Term | Definition |
|------|------------|
| **SSR** | Server-Side Rendering |
| **SSG** | Static Site Generation |
| **ISR** | Incremental Static Regeneration |
| **CSR** | Client-Side Rendering |
| **CDN** | Content Delivery Network |
| **JWT** | JSON Web Token |
| **ORM** | Object-Relational Mapping |
| **TTL** | Time To Live |
| **RTO** | Recovery Time Objective |
| **RPO** | Recovery Point Objective |
| **PCI DSS** | Payment Card Industry Data Security Standard |

### 9.5 References

- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- Stripe API: https://stripe.com/docs/api
- Vercel Platform: https://vercel.com/docs
- PostgreSQL Documentation: https://www.postgresql.org/docs/

---

## 10. Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Solution Architect | ___________ | ___________ | ___________ |
| Tech Lead | ___________ | ___________ | ___________ |
| DevOps Lead | ___________ | ___________ | ___________ |
| Security Lead | ___________ | ___________ | ___________ |
| Project Manager | ___________ | ___________ | ___________ |

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 9, 2025 | Solution Architect | Initial architecture design |

---

**End of Architectural Design Document**

