# Business Requirements Document (BRD)
## UniCart - E-Commerce Platform

**Version:** 1.0  
**Date:** October 9, 2025  
**Project Name:** UniCart  
**Document Owner:** Product Team

---

## 1. Executive Summary

UniCart is a modern, scalable e-commerce platform designed to provide a seamless shopping experience similar to Amazon. Built with cutting-edge technologies including Next.js 14, React 18, TypeScript, and PostgreSQL, UniCart will support product browsing, shopping cart management, secure checkout, user authentication, order tracking, and admin management.

**Key Highlights:**
- Multi-vendor marketplace capability
- Real-time inventory management
- Secure payment processing
- Mobile-responsive design
- SEO-optimized product pages
- Advanced search and filtering

---

## 2. Purpose and Objectives

### 2.1 Purpose
To create a production-ready e-commerce platform that enables customers to browse, search, and purchase products online while providing administrators with tools to manage inventory, orders, and customer relationships.

### 2.2 Business Objectives
- Launch MVP within 3-4 months
- Support 10,000+ concurrent users
- Achieve 99.9% uptime
- Process payments securely with PCI compliance
- Provide sub-3-second page load times
- Enable scalable multi-vendor operations

### 2.3 Success Metrics
- User registration conversion: >25%
- Cart abandonment rate: <70%
- Average order value: $50+
- Customer satisfaction: 4.5+ stars
- Mobile traffic: >60%

---

## 3. Functional Requirements

### 3.1 User Management

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-UM-001 | User registration with email/password | High | Users can create account with valid email, receive verification email |
| FR-UM-002 | JWT-based authentication | High | Users receive JWT token on login, token expires after 7 days |
| FR-UM-003 | User login/logout | High | Users can login with credentials, logout clears session |
| FR-UM-004 | Password reset functionality | Medium | Users receive reset link via email, can set new password |
| FR-UM-005 | User profile management | Medium | Users can update name, email, phone, address |
| FR-UM-006 | Multiple shipping addresses | Low | Users can save and manage multiple delivery addresses |
| FR-UM-007 | OAuth integration (Google, Facebook) | Low | Users can login via social accounts |

### 3.2 Product Management

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-PM-001 | Product listing page | High | Display products with image, name, price, rating |
| FR-PM-002 | Product detail page | High | Show description, images, specs, reviews, stock status |
| FR-PM-003 | Product categories and subcategories | High | Hierarchical category navigation with breadcrumbs |
| FR-PM-004 | Advanced search functionality | High | Search by keyword, filter by price, category, rating, brand |
| FR-PM-005 | Product image gallery | Medium | Multiple images with zoom, 360-degree view support |
| FR-PM-006 | Product variants | Medium | Support for size, color, and other variants |
| FR-PM-007 | Related products recommendation | Medium | Display similar/complementary products |
| FR-PM-008 | Product availability notifications | Low | Alert users when out-of-stock items are available |

### 3.3 Shopping Cart

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-SC-001 | Add to cart | High | Users can add products with selected variants to cart |
| FR-SC-002 | Update cart quantities | High | Users can increase/decrease item quantities |
| FR-SC-003 | Remove from cart | High | Users can remove items from cart |
| FR-SC-004 | Cart persistence | High | Cart saved for logged-in users, 7 days in localStorage for guests |
| FR-SC-005 | Real-time price calculation | High | Display subtotal, tax, shipping, total with updates |
| FR-SC-006 | Cart item availability check | Medium | Verify stock before checkout |
| FR-SC-007 | Save for later | Low | Move items to wishlist/saved items |

### 3.4 Checkout & Payment

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-CP-001 | Guest checkout | High | Allow purchases without registration |
| FR-CP-002 | Shipping address selection | High | Choose from saved addresses or add new |
| FR-CP-003 | Payment method selection | High | Support credit/debit cards, PayPal, Stripe |
| FR-CP-004 | Order review page | High | Display all order details before payment |
| FR-CP-005 | Payment processing | High | Secure payment with 3D Secure support |
| FR-CP-006 | Order confirmation | High | Display order number, send confirmation email |
| FR-CP-007 | Promo code application | Medium | Apply discount codes at checkout |
| FR-CP-008 | Multiple payment methods | Low | Split payment across multiple cards/methods |

### 3.5 Order Management

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-OM-001 | Order history | High | Users can view past orders with details |
| FR-OM-002 | Order tracking | High | Real-time order status updates |
| FR-OM-003 | Order cancellation | Medium | Cancel orders before shipment |
| FR-OM-004 | Invoice download | Medium | Generate and download PDF invoices |
| FR-OM-005 | Return/refund requests | Medium | Initiate return within 30 days |
| FR-OM-006 | Order status notifications | Medium | Email/SMS updates for order stages |

### 3.6 Review & Rating

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-RR-001 | Product reviews | Medium | Users can write reviews for purchased products |
| FR-RR-002 | Star ratings (1-5) | Medium | Rate products with star system |
| FR-RR-003 | Review images | Low | Upload images with reviews |
| FR-RR-004 | Helpful votes | Low | Mark reviews as helpful |
| FR-RR-005 | Review moderation | Medium | Admin approval before publishing |

### 3.7 Admin Panel

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-AP-001 | Product CRUD operations | High | Create, read, update, delete products |
| FR-AP-002 | Inventory management | High | Track stock levels, set low-stock alerts |
| FR-AP-003 | Order management dashboard | High | View, update, fulfill orders |
| FR-AP-004 | User management | Medium | View users, manage permissions, handle issues |
| FR-AP-005 | Analytics dashboard | Medium | Sales reports, top products, revenue metrics |
| FR-AP-006 | Category management | Medium | Manage product categories and attributes |
| FR-AP-007 | Discount/coupon management | Low | Create and manage promotional codes |

### 3.8 Wishlist

| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FR-WL-001 | Add to wishlist | Medium | Save products for later purchase |
| FR-WL-002 | View wishlist | Medium | Display all saved items |
| FR-WL-003 | Move to cart | Medium | Quick add from wishlist to cart |
| FR-WL-004 | Remove from wishlist | Medium | Delete items from wishlist |

---

## 4. Non-Functional Requirements

### 4.1 Performance

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-PF-001 | Page load time | < 3 seconds | High |
| NFR-PF-002 | Time to Interactive (TTI) | < 5 seconds | High |
| NFR-PF-003 | API response time | < 500ms (p95) | High |
| NFR-PF-004 | Database query optimization | < 100ms (p95) | Medium |
| NFR-PF-005 | Image optimization | WebP format, lazy loading | High |
| NFR-PF-006 | Code splitting | Route-based chunking | Medium |

### 4.2 Scalability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-SC-001 | Concurrent users | 10,000+ | High |
| NFR-SC-002 | Database connections | Connection pooling | High |
| NFR-SC-003 | Horizontal scaling | Stateless architecture | High |
| NFR-SC-004 | CDN integration | Static assets via CDN | Medium |
| NFR-SC-005 | Caching strategy | Redis for session & data | High |

### 4.3 Security

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| NFR-SE-001 | Data encryption | TLS 1.3 for data in transit | High |
| NFR-SE-002 | Password hashing | bcrypt with salt (rounds=10) | High |
| NFR-SE-003 | SQL injection prevention | Parameterized queries only | High |
| NFR-SE-004 | XSS protection | Content Security Policy headers | High |
| NFR-SE-005 | CSRF protection | Token-based validation | High |
| NFR-SE-006 | Rate limiting | Max 100 requests/min per IP | Medium |
| NFR-SE-007 | PCI DSS compliance | No card data storage | High |
| NFR-SE-008 | JWT security | HttpOnly cookies, short expiry | High |

### 4.4 Availability

| ID | Requirement | Target | Priority |
|----|-------------|--------|----------|
| NFR-AV-001 | System uptime | 99.9% | High |
| NFR-AV-002 | Database backup | Daily automated backups | High |
| NFR-AV-003 | Disaster recovery | RTO < 4 hours, RPO < 1 hour | Medium |
| NFR-AV-004 | Health monitoring | Real-time alerts | Medium |

### 4.5 Usability

| ID | Requirement | Description | Priority |
|----|-------------|-------------|----------|
| NFR-US-001 | Mobile responsiveness | Support all devices (320px+) | High |
| NFR-US-002 | Browser compatibility | Chrome, Firefox, Safari, Edge (latest 2 versions) | High |
| NFR-US-003 | Accessibility | WCAG 2.1 Level AA compliance | Medium |
| NFR-US-004 | SEO optimization | Meta tags, structured data, sitemap | High |

---

## 5. Integration & Merge Requirements

### 5.1 Payment Gateways

| Service | Purpose | Priority |
|---------|---------|----------|
| **Stripe** | Primary payment processor | High |
| **PayPal** | Alternative payment method | Medium |
| **Razorpay** | Regional payment support (optional) | Low |

**Integration Details:**
- Webhook handling for payment status
- 3D Secure authentication
- Refund processing API
- Subscription billing (future)

### 5.2 Email Services

| Service | Purpose | Priority |
|---------|---------|----------|
| **SendGrid** or **AWS SES** | Transactional emails | High |

**Email Templates:**
- Account verification
- Password reset
- Order confirmation
- Shipping notifications
- Return/refund updates
- Marketing newsletters (optional)

### 5.3 Shipping APIs

| Service | Purpose | Priority |
|---------|---------|----------|
| **Shippo** or **EasyPost** | Multi-carrier shipping rates | Medium |
| **ShipStation** | Order fulfillment | Low |

**Features:**
- Real-time shipping rate calculation
- Label generation
- Tracking number integration
- Address validation

### 5.4 Other Integrations

| Service | Purpose | Priority |
|---------|---------|----------|
| **Cloudinary** or **AWS S3** | Image storage & CDN | High |
| **Google Analytics** | User behavior tracking | Medium |
| **Sentry** | Error tracking & monitoring | High |
| **Redis** | Caching & session storage | High |
| **Elasticsearch** (optional) | Advanced product search | Low |

---

## 6. High-Level Architecture

### 6.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Browser   │  │   Mobile   │  │   Tablet   │            │
│  │  (Desktop) │  │            │  │            │            │
│  └──────┬─────┘  └──────┬─────┘  └──────┬─────┘            │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │     CDN     │
                    │ (Cloudflare)│
                    └──────┬──────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                  NEXT.JS 14 APPLICATION                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              App Router (React 18)                     │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   Pages/    │  │ Components/ │  │   Layouts   │   │ │
│  │  │ app/...tsx  │  │  UI/Forms   │  │             │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           State Management (Zustand)                   │ │
│  │  ┌───────┐  ┌───────┐  ┌───────┐  ┌──────────┐       │ │
│  │  │ Cart  │  │ User  │  │ Auth  │  │ Products │       │ │
│  │  │ Store │  │ Store │  │ Store │  │  Store   │       │ │
│  │  └───────┘  └───────┘  └───────┘  └──────────┘       │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API Routes (/app/api/...)                 │ │
│  │  ┌─────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐    │ │
│  │  │ /auth/* │ │/products/*│ │/orders/*│ │ /users/* │    │ │
│  │  └─────────┘ └──────────┘ └────────┘ └──────────┘    │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────┬───────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
    ┌─────▼──────┐  ┌─────▼─────┐  ┌──────▼──────┐
    │ PostgreSQL │  │   Redis   │  │  External   │
    │  Database  │  │  Cache/   │  │   APIs      │
    │            │  │  Session  │  │             │
    └────────────┘  └───────────┘  │ - Stripe    │
                                   │ - SendGrid  │
                                   │ - Cloudinary│
                                   │ - Shippo    │
                                   └─────────────┘
```

### 6.2 Technology Stack Details

**Frontend:**
- Next.js 14 (App Router with Server Components)
- React 18 (with Suspense, Streaming SSR)
- TypeScript (strict mode)
- Tailwind CSS (utility-first styling)
- Zustand (lightweight state management)
- React Hook Form (form handling)
- Zod (schema validation)

**Backend:**
- Next.js API Routes (serverless functions)
- Node.js runtime
- Prisma ORM (type-safe database access)
- JWT (jsonwebtoken library)

**Database:**
- PostgreSQL 15+ (primary database)
- Redis (caching, session storage)

**DevOps & Deployment:**
- Vercel (hosting & deployment)
- GitHub Actions (CI/CD)
- Docker (local development)

### 6.3 Database Architecture

**Connection Management:**
- Connection pooling with PgBouncer
- Max connections: 100
- Idle timeout: 10 minutes
- Query timeout: 30 seconds

**Backup Strategy:**
- Automated daily backups
- Point-in-time recovery
- 30-day retention period

---

## 7. User Stories

### 7.1 Customer Stories

**Epic: Product Discovery**
- As a customer, I want to browse products by category so I can find items I'm interested in
- As a customer, I want to search for products by keyword so I can quickly find specific items
- As a customer, I want to filter products by price range, brand, and rating so I can narrow down my choices
- As a customer, I want to view product details including images, description, and reviews so I can make informed decisions

**Epic: Shopping Cart**
- As a customer, I want to add products to my cart so I can purchase them later
- As a customer, I want to update quantities in my cart so I can buy the right amount
- As a customer, I want my cart to persist across sessions so I don't lose my selections
- As a customer, I want to see real-time price updates so I know the total cost

**Epic: Checkout**
- As a customer, I want to checkout as a guest so I can purchase quickly without creating an account
- As a customer, I want to save multiple shipping addresses so I can send orders to different locations
- As a customer, I want to apply promo codes so I can get discounts
- As a customer, I want to pay securely with my credit card so my information is protected

**Epic: Order Management**
- As a customer, I want to view my order history so I can track past purchases
- As a customer, I want to track my order status so I know when to expect delivery
- As a customer, I want to cancel orders before they ship so I can change my mind
- As a customer, I want to initiate returns so I can get refunds for unwanted items

**Epic: Account Management**
- As a customer, I want to create an account so I can save my preferences
- As a customer, I want to reset my password so I can regain access if I forget it
- As a customer, I want to update my profile information so it stays current
- As a customer, I want to save items to a wishlist so I can purchase them later

### 7.2 Admin Stories

**Epic: Product Management**
- As an admin, I want to add new products so customers can purchase them
- As an admin, I want to update product information so it stays accurate
- As an admin, I want to manage inventory levels so I can prevent overselling
- As an admin, I want to set product visibility so I can hide out-of-stock items

**Epic: Order Management**
- As an admin, I want to view all orders so I can process them
- As an admin, I want to update order status so customers know the progress
- As an admin, I want to process refunds so I can handle returns
- As an admin, I want to generate shipping labels so I can fulfill orders

**Epic: Analytics**
- As an admin, I want to view sales reports so I can track revenue
- As an admin, I want to see top-selling products so I can optimize inventory
- As an admin, I want to monitor user activity so I can improve the experience
- As an admin, I want to track conversion rates so I can measure success

### 7.3 System Stories

- As the system, I want to send order confirmation emails so customers have purchase records
- As the system, I want to update inventory automatically so stock levels are accurate
- As the system, I want to process scheduled backups so data is protected
- As the system, I want to log errors for monitoring so issues can be resolved quickly

---

## 8. Data Models

### 8.1 PostgreSQL Schema

```sql
-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'customer', -- customer, admin, vendor
    email_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Addresses Table
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    address_type VARCHAR(20), -- shipping, billing
    full_name VARCHAR(200),
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'US',
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    brand VARCHAR(100),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    compare_price DECIMAL(10, 2), -- original price for discounts
    cost_price DECIMAL(10, 2), -- wholesale/cost
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 10,
    weight DECIMAL(8, 2), -- in kg
    dimensions VARCHAR(50), -- LxWxH in cm
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    rating_average DECIMAL(2, 1) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Images Table
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Variants Table (for size, color, etc.)
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_name VARCHAR(100), -- e.g., "Red / Large"
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    attributes JSONB, -- { "color": "Red", "size": "L" }
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    guest_email VARCHAR(255), -- for guest checkout
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled, refunded
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
    payment_method VARCHAR(50),
    payment_intent_id VARCHAR(255), -- Stripe payment intent
    
    subtotal DECIMAL(10, 2) NOT NULL,
    tax_amount DECIMAL(10, 2) DEFAULT 0,
    shipping_amount DECIMAL(10, 2) DEFAULT 0,
    discount_amount DECIMAL(10, 2) DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    
    shipping_address JSONB, -- stored as JSON
    billing_address JSONB,
    
    tracking_number VARCHAR(100),
    shipping_carrier VARCHAR(50),
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    variant_name VARCHAR(100),
    
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    is_verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Review Images Table
CREATE TABLE review_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wishlists Table
CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Coupons Table
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255),
    discount_type VARCHAR(20), -- percentage, fixed
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_amount DECIMAL(10, 2),
    max_discount_amount DECIMAL(10, 2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Table (for logged-in users)
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id, variant_id)
);

-- Password Reset Tokens Table
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Verification Tokens Table
CREATE TABLE email_verification_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8.2 Indexes for Performance

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Address indexes
CREATE INDEX idx_addresses_user_id ON addresses(user_id);

-- Product indexes
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_price ON products(price);

-- Order indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Order items indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Review indexes
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);

-- Cart indexes
CREATE INDEX idx_carts_user_id ON carts(user_id);
```

### 8.3 Entity Relationships

```
users (1) ──── (M) addresses
users (1) ──── (M) orders
users (1) ──── (M) reviews
users (1) ──── (M) wishlists
users (1) ──── (M) carts

categories (1) ──── (M) products
categories (1) ──── (M) categories (self-reference)

products (1) ──── (M) product_images
products (1) ──── (M) product_variants
products (1) ──── (M) order_items
products (1) ──── (M) reviews
products (1) ──── (M) wishlists

orders (1) ──── (M) order_items

reviews (1) ──── (M) review_images
```

---

## 9. Security & Compliance

### 9.1 Authentication & Authorization

**Authentication Flow:**
1. User submits credentials
2. Backend validates credentials
3. If valid, generate JWT with payload: `{ userId, email, role, exp }`
4. Return JWT in HttpOnly cookie
5. Client includes cookie in subsequent requests
6. Backend validates JWT on protected routes

**Token Specifications:**
- Algorithm: HS256 or RS256
- Expiration: 7 days
- Refresh token: 30 days
- Storage: HttpOnly, Secure, SameSite cookies

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

### 9.2 Data Protection

| Measure | Implementation | Priority |
|---------|----------------|----------|
| Encryption at rest | PostgreSQL encryption | High |
| Encryption in transit | TLS 1.3 | High |
| Password hashing | bcrypt (10 rounds) | High |
| Sensitive data masking | Mask credit cards, emails in logs | High |
| Data anonymization | GDPR compliance for user deletion | Medium |

### 9.3 PCI DSS Compliance

**Key Requirements:**
1. **Never store full card data** - Use Stripe/PayPal tokenization
2. **Use certified payment processors** - Stripe is PCI Level 1 compliant
3. **Secure transmission** - TLS 1.2+ for all payment data
4. **Access control** - Limit payment data access to authorized users only
5. **Regular security audits** - Quarterly vulnerability scans

**Payment Flow:**
```
Client → Stripe.js (tokenization) → Stripe API → Backend (charge with token)
```
This ensures card data never touches our servers.

### 9.4 API Security

| Measure | Implementation |
|---------|----------------|
| Rate limiting | 100 requests/min per IP, 1000/hour per user |
| Input validation | Zod schemas for all API inputs |
| SQL injection prevention | Prisma ORM with parameterized queries |
| XSS prevention | Content Security Policy headers |
| CSRF protection | CSRF tokens for state-changing operations |
| CORS | Whitelist specific origins |

### 9.5 Privacy & GDPR Compliance

**User Rights:**
- Right to access personal data
- Right to rectification
- Right to erasure ("right to be forgotten")
- Right to data portability
- Right to object to processing

**Implementation:**
- Privacy policy page
- Cookie consent banner
- Data export functionality
- Account deletion with data anonymization
- Audit logs for data access

### 9.6 Monitoring & Incident Response

**Security Monitoring:**
- Failed login attempt tracking
- Unusual activity detection
- Real-time alerts for security events
- Centralized logging with Sentry

**Incident Response Plan:**
1. Detection & analysis
2. Containment
3. Eradication
4. Recovery
5. Post-incident review

---

## 10. Roadmap and Risks

### 10.1 Development Roadmap

#### Phase 1: Foundation (Weeks 1-4)
**Objectives:** Setup infrastructure, core authentication, basic product listing

| Task | Duration | Owner |
|------|----------|-------|
| Project setup (Next.js, TypeScript, Tailwind) | 3 days | Dev Team |
| Database schema design & migration | 4 days | Backend Lead |
| Authentication system (JWT) | 5 days | Backend Lead |
| User registration & login UI | 4 days | Frontend Lead |
| Basic product listing page | 5 days | Frontend Lead |
| Admin panel setup | 4 days | Full Stack |
| CI/CD pipeline setup | 3 days | DevOps |

**Deliverables:**
- Working authentication system
- Product listing with pagination
- Basic admin panel for product CRUD
- Database deployed on production

#### Phase 2: Core E-Commerce (Weeks 5-8)
**Objectives:** Shopping cart, checkout, payment integration

| Task | Duration | Owner |
|------|----------|-------|
| Shopping cart (Zustand) | 4 days | Frontend Lead |
| Product detail page | 5 days | Frontend Lead |
| Search & filter functionality | 6 days | Full Stack |
| Checkout flow | 7 days | Full Stack |
| Stripe payment integration | 5 days | Backend Lead |
| Order management | 5 days | Full Stack |
| Email notifications (SendGrid) | 3 days | Backend Lead |

**Deliverables:**
- Complete shopping cart functionality
- Secure checkout with Stripe
- Order confirmation emails
- Order tracking for users

#### Phase 3: Enhanced Features (Weeks 9-12)
**Objectives:** Reviews, wishlist, admin analytics, shipping

| Task | Duration | Owner |
|------|----------|-------|
| Product reviews & ratings | 5 days | Full Stack |
| Wishlist functionality | 3 days | Full Stack |
| Shipping API integration | 5 days | Backend Lead |
| Advanced admin analytics | 7 days | Full Stack |
| Image optimization & CDN | 3 days | DevOps |
| SEO optimization | 4 days | Frontend Lead |
| Mobile responsiveness polish | 5 days | Frontend Lead |

**Deliverables:**
- Review system with moderation
- Wishlist feature
- Real-time shipping rates
- Admin analytics dashboard
- SEO-optimized pages

#### Phase 4: Polish & Launch (Weeks 13-16)
**Objectives:** Testing, optimization, deployment

| Task | Duration | Owner |
|------|----------|-------|
| Performance optimization | 5 days | Full Stack |
| Security audit | 4 days | Security Team |
| Cross-browser testing | 3 days | QA Team |
| Load testing | 3 days | DevOps |
| Bug fixes | 7 days | Dev Team |
| Documentation | 3 days | Tech Writer |
| Production deployment | 2 days | DevOps |
| Post-launch monitoring | Ongoing | All |

**Deliverables:**
- Production-ready application
- Performance benchmarks met
- Security audit passed
- Launch documentation

### 10.2 Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Scope creep** | High | High | Strict feature prioritization, regular backlog reviews |
| **Payment integration issues** | Medium | High | Early Stripe testing, sandbox environment, fallback to PayPal |
| **Performance degradation** | Medium | High | Early performance testing, caching strategy, CDN |
| **Security vulnerabilities** | Medium | Critical | Security audits, penetration testing, code reviews |
| **Database scalability** | Low | High | Connection pooling, query optimization, read replicas |
| **Third-party API downtime** | Medium | Medium | Graceful error handling, retry logic, status monitoring |
| **Team resource constraints** | Medium | Medium | Clear task assignment, pair programming, documentation |
| **Browser compatibility** | Low | Medium | Automated cross-browser testing, progressive enhancement |
| **Data migration issues** | Low | High | Backup strategy, migration testing, rollback plan |
| **Regulatory compliance** | Low | Critical | Legal review, GDPR compliance checklist, privacy audit |

### 10.3 Success Criteria

**Technical Metrics:**
- [ ] All API endpoints < 500ms response time (p95)
- [ ] Page load time < 3 seconds
- [ ] 99.9% uptime
- [ ] Zero critical security vulnerabilities
- [ ] 95%+ test coverage

**Business Metrics:**
- [ ] Successful payment processing > 99%
- [ ] Cart abandonment < 70%
- [ ] User registration conversion > 25%
- [ ] Mobile responsiveness score > 90
- [ ] SEO score > 85 (Lighthouse)

### 10.4 Future Enhancements (Post-MVP)

**Phase 5 (Future):**
- Multi-vendor marketplace
- Live chat support
- Advanced recommendation engine (ML-based)
- Mobile app (React Native)
- Internationalization (i18n)
- Subscription products
- Loyalty program
- Advanced inventory management
- Warehouse management system
- B2B portal

---

## 11. Appendix

### 11.1 Glossary

| Term | Definition |
|------|------------|
| **JWT** | JSON Web Token - secure authentication token |
| **SKU** | Stock Keeping Unit - unique product identifier |
| **PCI DSS** | Payment Card Industry Data Security Standard |
| **SSR** | Server-Side Rendering |
| **CSR** | Client-Side Rendering |
| **TTI** | Time to Interactive |
| **WCAG** | Web Content Accessibility Guidelines |
| **GDPR** | General Data Protection Regulation |
| **RTO** | Recovery Time Objective |
| **RPO** | Recovery Point Objective |

### 11.2 References

- Next.js 14 Documentation: https://nextjs.org/docs
- Stripe API Documentation: https://stripe.com/docs/api
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Tailwind CSS: https://tailwindcss.com/docs
- Zustand Documentation: https://github.com/pmndrs/zustand
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- PCI DSS Standards: https://www.pcisecuritystandards.org/

### 11.3 Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | ___________ | ___________ | ___________ |
| Tech Lead | ___________ | ___________ | ___________ |
| Security Lead | ___________ | ___________ | ___________ |
| Project Manager | ___________ | ___________ | ___________ |

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 9, 2025 | Product Team | Initial BRD creation |

---

**End of Document**

