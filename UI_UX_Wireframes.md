# UI/UX Wireframes Document
## UniCart - E-Commerce Platform

**Version:** 1.0  
**Date:** October 9, 2025  
**Project Name:** UniCart  
**Document Type:** UI/UX Wireframes & User Flows  
**Based on:** BRD v1.0

---

## Table of Contents
1. [Application Overview](#1-application-overview)
2. [User Flows](#2-user-flows)
3. [Screen List](#3-screen-list)
4. [Wireframe Descriptions](#4-wireframe-descriptions)

---

## 1. Application Overview

### 1.1 Purpose
UniCart is a modern e-commerce platform similar to Amazon, designed to provide seamless shopping experiences across all devices. The platform serves two primary user types:
- **Customers** - Browse, search, purchase products
- **Administrators** - Manage products, orders, inventory, analytics

### 1.2 Key Features
- Product browsing with advanced search and filters
- Shopping cart with real-time price updates
- Secure checkout with multiple payment options
- User account management
- Order tracking and history
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard for business management

### 1.3 Design Principles
- **Mobile-First:** Responsive design for all devices (320px+)
- **Performance:** Page load < 3 seconds
- **Accessibility:** WCAG 2.1 AA compliance
- **Simplicity:** Clear navigation and intuitive interactions
- **Trust:** Secure checkout with clear security indicators

---

## 2. User Flows

### 2.1 Customer Journey - Browse & Purchase

#### Flow 1: Guest Checkout (Quick Purchase)
```
1. User lands on Homepage
   ↓
2. Browse products OR Search for product
   ↓
3. Click on product → Product Detail Page
   ↓
4. Select variant (size/color) → Add to Cart
   ↓
5. View Cart → Proceed to Checkout
   ↓
6. Guest Checkout (Enter Email)
   ↓
7. Enter Shipping Address
   ↓
8. Select Shipping Method
   ↓
9. Review Order
   ↓
10. Enter Payment Details (Stripe)
   ↓
11. Place Order
   ↓
12. Order Confirmation Page
   ↓
13. Receive Confirmation Email
```

#### Flow 2: Registered User Purchase
```
1. User lands on Homepage
   ↓
2. Login/Register
   ↓
3. Browse/Search Products
   ↓
4. View Product Details
   ↓
5. Add to Cart (Cart persists across sessions)
   ↓
6. Continue shopping OR Checkout
   ↓
7. Checkout (Auto-filled shipping address)
   ↓
8. Select saved address OR Add new
   ↓
9. Apply Promo Code (optional)
   ↓
10. Review Order
   ↓
11. Payment (saved cards OR new card)
   ↓
12. Place Order
   ↓
13. Order Confirmation
   ↓
14. View Order in "My Orders"
```

#### Flow 3: Product Discovery
```
1. Homepage
   ↓
2. Option A: Browse by Category → Category Page
   Option B: Search → Search Results
   Option C: View Featured Products
   ↓
3. Apply Filters (Price, Brand, Rating)
   ↓
4. Sort Results (Price, Popularity, Rating)
   ↓
5. View Product Details
   ↓
6. Read Reviews & Ratings
   ↓
7. Add to Cart OR Add to Wishlist
```

### 2.2 Customer Journey - Account Management

#### Flow 4: User Registration
```
1. Homepage → Click "Sign Up"
   ↓
2. Registration Form
   - Email
   - Password
   - Name
   ↓
3. Submit → Receive Verification Email
   ↓
4. Click Email Link → Email Verified
   ↓
5. Redirect to Homepage (Logged In)
```

#### Flow 5: Password Reset
```
1. Login Page → "Forgot Password?"
   ↓
2. Enter Email
   ↓
3. Submit → Receive Reset Email
   ↓
4. Click Reset Link → Reset Password Page
   ↓
5. Enter New Password
   ↓
6. Submit → Password Updated
   ↓
7. Redirect to Login
```

#### Flow 6: Order Tracking
```
1. Login → My Account
   ↓
2. Click "My Orders"
   ↓
3. View Order List
   ↓
4. Click Order → Order Details
   ↓
5. View Order Status (Pending/Processing/Shipped/Delivered)
   ↓
6. Track Shipment (if shipped)
   ↓
7. Download Invoice OR Initiate Return
```

### 2.3 Admin Journey

#### Flow 7: Product Management
```
1. Admin Login → Admin Dashboard
   ↓
2. Click "Products" → Product List
   ↓
3. Click "Add Product"
   ↓
4. Fill Product Form
   - Name, Description
   - Category, Brand
   - Price, Stock
   - Images
   - Variants
   ↓
5. Save Product
   ↓
6. Product Published → Visible to Customers
```

#### Flow 8: Order Fulfillment
```
1. Admin Dashboard
   ↓
2. Click "Orders" → Order List
   ↓
3. Filter by Status (Pending/Processing/Shipped)
   ↓
4. Click Order → Order Details
   ↓
5. Update Order Status
   ↓
6. Add Tracking Number
   ↓
7. Generate Shipping Label
   ↓
8. Mark as Shipped
   ↓
9. Customer receives notification
```

---

## 3. Screen List

### 3.1 Customer-Facing Screens (24 Screens)

#### Public Screens (Accessible without login)
1. **Homepage**
2. **Product Listing Page (Category/Search)**
3. **Product Detail Page**
4. **Shopping Cart Page**
5. **Login Page**
6. **Registration Page**
7. **Forgot Password Page**
8. **Reset Password Page**
9. **Email Verification Success Page**

#### Checkout Screens
10. **Checkout - Shipping Address**
11. **Checkout - Shipping Method**
12. **Checkout - Review Order**
13. **Checkout - Payment**
14. **Order Confirmation Page**

#### Protected Screens (Require login)
15. **My Account Dashboard**
16. **My Orders (Order History)**
17. **Order Details & Tracking**
18. **My Profile (Edit Profile)**
19. **Address Book (Manage Addresses)**
20. **Wishlist Page**
21. **Write Review Page**
22. **Change Password Page**

#### Utility Screens
23. **404 - Page Not Found**
24. **Error Page (500)**

### 3.2 Admin Panel Screens (12 Screens)

1. **Admin Login**
2. **Admin Dashboard (Analytics)**
3. **Product List (Manage Products)**
4. **Add/Edit Product Form**
5. **Category Management**
6. **Order List (Manage Orders)**
7. **Order Details (Admin View)**
8. **User Management**
9. **Coupon Management**
10. **Inventory Management**
11. **Analytics & Reports**
12. **Admin Settings**

**Total: 36 Screens**

---

## 4. Wireframe Descriptions

### 4.1 Customer-Facing Screens

---

### Screen 1: Homepage

**Purpose:**  
Main landing page to showcase products, categories, and drive user engagement.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                               │
│ [Logo] [Search Bar] [Cart(2)] [Wishlist] [Account]  │
│ [Category Nav: Electronics | Fashion | Home ...]    │
├─────────────────────────────────────────────────────┤
│ HERO BANNER                                          │
│ [Large promotional image/carousel]                   │
│ "Summer Sale - Up to 50% Off"                       │
│ [Shop Now Button]                                    │
├─────────────────────────────────────────────────────┤
│ FEATURED CATEGORIES                                  │
│ [Electronics] [Fashion] [Home] [Beauty] [Sports]   │
│  (Icon grid with images)                            │
├─────────────────────────────────────────────────────┤
│ DEALS OF THE DAY                                     │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                │
│ │Product│ │Product│ │Product│ │Product│               │
│ │Image  │ │Image  │ │Image  │ │Image  │               │
│ │$49.99 │ │$29.99 │ │$99.99 │ │$19.99 │               │
│ │⭐4.5  │ │⭐4.8  │ │⭐4.2  │ │⭐4.9  │               │
│ └──────┘ └──────┘ └──────┘ └──────┘                │
│ [View All Deals →]                                   │
├─────────────────────────────────────────────────────┤
│ TRENDING PRODUCTS                                    │
│ [Horizontal scrollable product grid]                │
├─────────────────────────────────────────────────────┤
│ WHY SHOP WITH US                                     │
│ [Free Shipping] [Easy Returns] [Secure Payment]    │
├─────────────────────────────────────────────────────┤
│ FOOTER                                               │
│ [Links] [Social Media] [Newsletter] [Copyright]    │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Hero carousel with auto-rotation (5 seconds)
- Search bar with autocomplete suggestions
- Category quick links
- Product cards with "Add to Cart" quick action
- Cart badge shows item count
- Responsive grid layout (mobile: 2 columns, tablet: 3, desktop: 4-5)

**Interactions:**
- Click product card → Product Detail Page
- Click category → Category/Listing Page
- Search → Search Results Page
- Cart icon → Cart Page
- Account icon → Login/Account dropdown

**Navigation:**
- Header: Persistent across all pages
- Footer: Links to About, Contact, Privacy, Terms

---

### Screen 2: Product Listing Page (Category/Search Results)

**Purpose:**  
Display filtered/searched products with sorting and filtering options.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                            │
├─────────────────────────────────────────────────────┤
│ BREADCRUMB                                           │
│ Home > Electronics > Smartphones                     │
├──────────┬──────────────────────────────────────────┤
│ FILTERS  │ PRODUCTS                                  │
│ (Sidebar)│                                           │
│          │ [Sort by: Price ▼] [View: Grid/List]     │
│ Category │ Showing 24 of 156 results                │
│ □ Phone  │                                           │
│ □ Laptop │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│ □ Tablet │ │Product│ │Product│ │Product│ │Product│   │
│          │ │Image  │ │Image  │ │Image  │ │Image  │   │
│ Price    │ │Name   │ │Name   │ │Name   │ │Name   │   │
│ [$] [to] │ │$699   │ │$899   │ │$549   │ │$799   │   │
│ [$]      │ │⭐4.5  │ │⭐4.8  │ │⭐4.2  │ │⭐4.9  │   │
│ [Apply]  │ │[Cart] │ │[Cart] │ │[Cart] │ │[Cart] │   │
│          │ └──────┘ └──────┘ └──────┘ └──────┘    │
│ Brand    │                                           │
│ □ Apple  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐    │
│ □ Samsung│ │...    │ │...    │ │...    │ │...    │   │
│ □ Google │ └──────┘ └──────┘ └──────┘ └──────┘    │
│          │                                           │
│ Rating   │ [1] [2] [3] [4] [5] [6] - Pagination    │
│ ⭐⭐⭐⭐⭐ │                                           │
│ ⭐⭐⭐⭐  │                                           │
│          │                                           │
│ [Clear]  │                                           │
└──────────┴──────────────────────────────────────────┘
```

**Key Functionalities:**
- Real-time filter application (no page reload)
- Sort options: Price (Low-High, High-Low), Rating, Newest, Popular
- Grid/List view toggle
- Pagination or infinite scroll
- Filter count badges (e.g., "Price (3 selected)")
- Quick "Add to Cart" on hover
- Wishlist heart icon on product cards

**Interactions:**
- Apply filter → Update results instantly
- Click product → Product Detail Page
- Sort dropdown → Reorder products
- Grid/List toggle → Change layout
- Mobile: Filters in bottom sheet/modal

**Navigation:**
- Breadcrumb navigation
- Back to previous page
- Sidebar filters (desktop) / Filter button (mobile)

---

### Screen 3: Product Detail Page

**Purpose:**  
Display comprehensive product information to help purchase decisions.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                            │
├─────────────────────────────────────────────────────┤
│ BREADCRUMB                                           │
│ Home > Electronics > Smartphones > iPhone 15 Pro    │
├────────────────────┬────────────────────────────────┤
│ PRODUCT IMAGES     │ PRODUCT INFO                   │
│                    │                                 │
│ ┌────────────────┐│ iPhone 15 Pro - 256GB          │
│ │                ││                                 │
│ │  Main Image    ││ ⭐⭐⭐⭐⭐ 4.8 (1,234 reviews) │
│ │  (Zoomable)    ││                                 │
│ │                ││ $999.00 $1,199.00 (17% off)   │
│ └────────────────┘│ In Stock - Only 5 left         │
│                    │                                 │
│ [Thumb] [Thumb]   │ COLOR: [Black] [Silver] [Gold] │
│ [Thumb] [Thumb]   │ SIZE: [128GB] [256GB] [512GB]  │
│                    │                                 │
│                    │ Quantity: [−] [1] [+]          │
│                    │                                 │
│                    │ [Add to Cart] [Buy Now]        │
│                    │ [♡ Add to Wishlist]            │
│                    │                                 │
│                    │ ✓ Free Shipping                │
│                    │ ✓ 30-Day Returns               │
│                    │ ✓ 1-Year Warranty              │
├────────────────────┴────────────────────────────────┤
│ TABS                                                 │
│ [Description] [Specifications] [Reviews] [Q&A]      │
├─────────────────────────────────────────────────────┤
│ DESCRIPTION TAB (Active)                             │
│ Lorem ipsum dolor sit amet, consectetur adipiscing   │
│ elit. Detailed product description here...          │
│                                                      │
│ Key Features:                                        │
│ • Feature 1                                         │
│ • Feature 2                                         │
│ • Feature 3                                         │
├─────────────────────────────────────────────────────┤
│ CUSTOMER REVIEWS (4.8 ⭐)                           │
│                                                      │
│ [Write a Review Button]                             │
│                                                      │
│ ┌─────────────────────────────────────────────┐    │
│ │ ⭐⭐⭐⭐⭐ John D. - Verified Purchase         │    │
│ │ "Excellent product! Highly recommend..."    │    │
│ │ [Helpful? 👍 45] [👎 2]                     │    │
│ └─────────────────────────────────────────────┘    │
│ [Show More Reviews]                                 │
├─────────────────────────────────────────────────────┤
│ RELATED PRODUCTS                                     │
│ [Product] [Product] [Product] [Product]             │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Image gallery with zoom on hover/click
- Variant selection (color, size) updates price and availability
- Quantity selector with stock validation
- "Add to Cart" updates cart badge
- "Buy Now" → Direct to checkout
- Real-time stock indicator
- Review sorting and filtering
- "Mark as helpful" for reviews
- Share product (social media icons)

**Interactions:**
- Select variant → Update price, image, stock status
- Add to Cart → Success toast + Cart badge update
- Buy Now → Checkout page (with this product)
- Click review → Expand full review
- Image click → Lightbox/zoom view
- Tab switching → Show relevant content

**Navigation:**
- Breadcrumb
- Back to search/category results
- Sticky "Add to Cart" on mobile scroll

---

### Screen 4: Shopping Cart Page

**Purpose:**  
Review cart items, update quantities, apply coupons before checkout.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                               │
├─────────────────────────────────────────────────────┤
│ Shopping Cart (3 items)                             │
├────────────────────────────────┬────────────────────┤
│ CART ITEMS                     │ ORDER SUMMARY      │
│                                │                    │
│ ┌────────────────────────────┐│ Subtotal: $248.97 │
│ │ [X] [Image] Product Name   ││ Shipping: $9.99   │
│ │     Color: Black, Size: M  ││ Tax: $18.71       │
│ │     $49.99                 ││ ─────────────────  │
│ │     Qty: [−] [2] [+]       ││ Total: $277.67    │
│ │     [Remove] [Save Later]  ││                    │
│ └────────────────────────────┘│ Promo Code:       │
│                                │ [Enter code]      │
│ ┌────────────────────────────┐│ [Apply]           │
│ │ [X] [Image] Product Name   ││                    │
│ │     $99.99                 ││ [Proceed to       │
│ │     Qty: [−] [1] [+]       ││  Checkout]        │
│ │     In Stock              ││                    │
│ └────────────────────────────┘│ [Continue         │
│                                │  Shopping]        │
│ ┌────────────────────────────┐│                    │
│ │ [X] [Image] Product Name   ││ ✓ Secure Checkout │
│ │     $98.99                 ││ ✓ Free Returns    │
│ │     Qty: [−] [1] [+]       ││                    │
│ │     Low Stock (3 left)    ││                    │
│ └────────────────────────────┘│                    │
├────────────────────────────────┴────────────────────┤
│ RECOMMENDED FOR YOU                                  │
│ [Product] [Product] [Product] [Product]             │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Real-time price updates on quantity change
- Stock validation (prevent exceeding available stock)
- Remove item with confirmation
- Save for later → Move to wishlist
- Promo code validation and application
- Cart persistence (logged in users / localStorage for guests)
- Empty cart state with "Continue Shopping" CTA

**Interactions:**
- Quantity change → Update subtotal and total
- Remove item → Confirmation toast
- Apply promo → Validate and update discount
- Proceed to Checkout → Shipping address page
- Continue Shopping → Return to homepage/previous page

**Navigation:**
- Header cart badge
- Back to shopping
- Proceed to checkout

---

### Screen 5: Checkout - Shipping Address

**Purpose:**  
Collect or confirm shipping address for order delivery.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Simplified - Logo only)                     │
├─────────────────────────────────────────────────────┤
│ CHECKOUT PROGRESS                                    │
│ [1. Shipping ●] → [2. Payment ○] → [3. Review ○]   │
├────────────────────────────────┬────────────────────┤
│ SHIPPING ADDRESS               │ ORDER SUMMARY      │
│                                │                    │
│ For Logged-in Users:           │ 3 Items            │
│ ┌────────────────────────────┐│                    │
│ │ ○ Home Address (Default)  ││ ┌────────────────┐│
│ │   John Doe                 ││ │ [Img] Product  ││
│ │   123 Main St, Apt 4B      ││ │ Qty: 2  $99.98 ││
│ │   New York, NY 10001       ││ └────────────────┘│
│ │   (555) 123-4567           ││                    │
│ │   [Edit]                   ││ Subtotal: $248.97 │
│ └────────────────────────────┘│ Shipping: TBD     │
│                                │ Tax: $18.71       │
│ ┌────────────────────────────┐│ ─────────────────  │
│ │ ○ Office Address           ││ Total: $267.68    │
│ │   456 Business Ave         ││                    │
│ │   New York, NY 10002       ││                    │
│ │   [Edit]                   ││                    │
│ └────────────────────────────┘│                    │
│                                │                    │
│ [+ Add New Address]            │                    │
│                                │                    │
│ For Guest Users:               │                    │
│ Full Name: [_____________]     │                    │
│ Email: [_____________]         │                    │
│ Phone: [_____________]         │                    │
│ Address: [_____________]       │                    │
│ City: [_______] State: [____]  │                    │
│ Zip: [_____] Country: [US ▼]  │                    │
│                                │                    │
│ □ Save this address            │                    │
│                                │                    │
│ [← Back to Cart]               │                    │
│ [Continue to Shipping →]       │                    │
└────────────────────────────────┴────────────────────┘
```

**Key Functionalities:**
- Address selection for logged-in users
- Address form validation (required fields)
- Save address option
- Real-time validation feedback
- Auto-complete for address (Google Places API)
- Mobile-optimized form inputs

**Interactions:**
- Select saved address → Enable continue button
- Add new address → Show form
- Form validation → Highlight errors
- Continue → Shipping method page
- Back → Return to cart

**Navigation:**
- Progress indicator
- Back to cart
- Continue to next step

---

### Screen 6: Checkout - Shipping Method

**Purpose:**  
Select shipping method and calculate shipping cost.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Simplified)                                  │
├─────────────────────────────────────────────────────┤
│ CHECKOUT PROGRESS                                    │
│ [1. Shipping ✓] → [2. Shipping Method ●] → [3. Payment ○] → [4. Review ○]
├────────────────────────────────┬────────────────────┤
│ SHIPPING METHOD                │ ORDER SUMMARY      │
│                                │                    │
│ Delivering to:                 │ 3 Items            │
│ John Doe, 123 Main St...       │ Subtotal: $248.97 │
│ [Change Address]               │                    │
│                                │ Shipping Method:   │
│ Select Shipping Method:        │ Standard - $9.99  │
│                                │                    │
│ ┌────────────────────────────┐│ Tax: $18.71       │
│ │ ○ Standard Shipping        ││ ─────────────────  │
│ │   5-7 Business Days        ││ Total: $277.67    │
│ │   $9.99                    ││                    │
│ └────────────────────────────┘│                    │
│                                │                    │
│ ┌────────────────────────────┐│                    │
│ │ ○ Express Shipping         ││                    │
│ │   2-3 Business Days        ││                    │
│ │   $19.99                   ││                    │
│ └────────────────────────────┘│                    │
│                                │                    │
│ ┌────────────────────────────┐│                    │
│ │ ○ Next Day Delivery        ││                    │
│ │   Order by 2 PM            ││                    │
│ │   $29.99                   ││                    │
│ └────────────────────────────┘│                    │
│                                │                    │
│ Estimated Delivery:            │                    │
│ Dec 15 - Dec 22, 2024         │                    │
│                                │                    │
│ [← Back]                       │                    │
│ [Continue to Payment →]        │                    │
└────────────────────────────────┴────────────────────┘
```

**Key Functionalities:**
- Real-time shipping rate calculation
- Delivery date estimation
- Update total when shipping method changes
- Free shipping indicator (if applicable)

**Interactions:**
- Select shipping → Update total and delivery date
- Continue → Payment page
- Back → Shipping address page

---

### Screen 7: Checkout - Payment

**Purpose:**  
Collect payment information securely via Stripe.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Simplified)                                  │
├─────────────────────────────────────────────────────┤
│ CHECKOUT PROGRESS                                    │
│ [1. Shipping ✓] → [2. Method ✓] → [3. Payment ●] → [4. Review ○]
├────────────────────────────────┬────────────────────┤
│ PAYMENT METHOD                 │ ORDER SUMMARY      │
│                                │                    │
│ For Logged-in Users:           │ 3 Items            │
│ ┌────────────────────────────┐│ Subtotal: $248.97 │
│ │ ○ Visa ending in 1234      ││ Shipping: $9.99   │
│ │   Expires 12/25            ││ Tax: $18.71       │
│ └────────────────────────────┘│ ─────────────────  │
│                                │ Total: $277.67    │
│ [+ Add New Payment Method]     │                    │
│                                │                    │
│ ┌────────────────────────────┐│ ✓ Secure Payment  │
│ │ Card Number                ││ ✓ PCI Compliant   │
│ │ [____-____-____-____]      ││                    │
│ │                            ││                    │
│ │ Expiry Date    CVV         ││                    │
│ │ [MM/YY]  [___]             ││                    │
│ │                            ││                    │
│ │ Cardholder Name            ││                    │
│ │ [___________________]      ││                    │
│ │                            ││                    │
│ │ □ Save card for future     ││                    │
│ │                            ││                    │
│ │ [Stripe Elements]          ││                    │
│ └────────────────────────────┘│                    │
│                                │                    │
│ Alternative Payment:           │                    │
│ [PayPal Button]                │                    │
│                                │                    │
│ Billing Address:               │                    │
│ ○ Same as shipping             │                    │
│ ○ Use different address        │                    │
│                                │                    │
│ [← Back]                       │                    │
│ [Review Order →]               │                    │
└────────────────────────────────┴────────────────────┘
```

**Key Functionalities:**
- Stripe Elements integration (secure card input)
- Saved payment methods (logged-in users)
- Real-time card validation
- CVV security tooltip
- PayPal integration
- Billing address option
- PCI compliance indicators

**Interactions:**
- Enter card details → Validate format
- Select saved card → Enable continue
- PayPal button → PayPal flow
- Continue → Review order page
- Back → Shipping method

**Security:**
- Stripe tokenization (no card data stored)
- SSL/TLS encryption indicator
- 3D Secure support

---

### Screen 8: Checkout - Review Order

**Purpose:**  
Final review before placing order.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Simplified)                                  │
├─────────────────────────────────────────────────────┤
│ CHECKOUT PROGRESS                                    │
│ [1. Shipping ✓] → [2. Method ✓] → [3. Payment ✓] → [4. Review ●]
├─────────────────────────────────────────────────────┤
│ REVIEW YOUR ORDER                                    │
├────────────────────────────────┬────────────────────┤
│ ORDER ITEMS                    │ ORDER SUMMARY      │
│                                │                    │
│ ┌────────────────────────────┐│ 3 Items            │
│ │ [Image] Product Name       ││                    │
│ │ Color: Black, Size: M      ││ Subtotal: $248.97 │
│ │ Qty: 2 × $49.99 = $99.98   ││ Shipping: $9.99   │
│ └────────────────────────────┘│ Tax: $18.71       │
│                                │ Discount: -$10.00 │
│ ┌────────────────────────────┐│ ─────────────────  │
│ │ [Image] Product Name       ││ Total: $267.67    │
│ │ Qty: 1 × $99.99            ││                    │
│ └────────────────────────────┘│ [Place Order]     │
│                                │                    │
│ [+ More items...]              │                    │
├────────────────────────────────┤                    │
│ SHIPPING ADDRESS               │                    │
│ John Doe                       │                    │
│ 123 Main St, Apt 4B            │                    │
│ New York, NY 10001             │                    │
│ (555) 123-4567                 │                    │
│ [Change]                       │                    │
├────────────────────────────────┤                    │
│ SHIPPING METHOD                │                    │
│ Standard Shipping (5-7 days)   │                    │
│ Estimated Delivery: Dec 15-22  │                    │
│ [Change]                       │                    │
├────────────────────────────────┤                    │
│ PAYMENT METHOD                 │                    │
│ Visa ending in 1234            │                    │
│ [Change]                       │                    │
├────────────────────────────────┴────────────────────┤
│ □ I agree to Terms & Conditions                     │
│                                                      │
│ [← Back to Payment]  [Place Order - $267.67]       │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Complete order summary
- Edit links for each section
- Terms acceptance checkbox
- Final total display
- Loading state on "Place Order"

**Interactions:**
- Change links → Navigate to respective steps
- Place Order → Process payment
- On success → Order Confirmation
- On failure → Error message + retry

---

### Screen 9: Order Confirmation Page

**Purpose:**  
Confirm successful order placement and provide order details.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Full Header Returns)                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│              ✓ ORDER CONFIRMED                      │
│                                                      │
│   Thank you for your order, John!                   │
│   Order #UC-2024-001234                             │
│                                                      │
│   A confirmation email has been sent to:            │
│   john.doe@email.com                                │
│                                                      │
├─────────────────────────────────────────────────────┤
│ ORDER DETAILS                                        │
│                                                      │
│ Order Number: UC-2024-001234                        │
│ Order Date: October 9, 2025, 2:30 PM               │
│ Estimated Delivery: Dec 15-22, 2025                │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ ITEMS ORDERED (3 items)                         ││
│ │                                                 ││
│ │ [Image] Product Name - Qty: 2   $99.98        ││
│ │ [Image] Product Name - Qty: 1   $99.99        ││
│ │ [Image] Product Name - Qty: 1   $98.99        ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌──────────────────┬──────────────────────────────┐│
│ │ SHIPPING ADDRESS │ PAYMENT METHOD               ││
│ │ John Doe         │ Visa ending in 1234          ││
│ │ 123 Main St      │ Amount charged: $267.67      ││
│ │ New York, NY     │                              ││
│ └──────────────────┴──────────────────────────────┘│
│                                                      │
│ Order Total: $267.67                                │
│                                                      │
│ [Track Your Order] [View Order Details]             │
│ [Download Invoice] [Continue Shopping]              │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Success confirmation visual
- Order number display
- Email confirmation sent indicator
- Order summary
- Quick action buttons

**Interactions:**
- Track Order → Order tracking page
- View Details → Order details page
- Download Invoice → PDF generation
- Continue Shopping → Homepage

---

### Screen 10: My Account Dashboard

**Purpose:**  
Central hub for user account management.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                               │
├─────────────────────────────────────────────────────┤
│ My Account                                           │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ DASHBOARD OVERVIEW                    │
│              │                                       │
│ My Account   │ Welcome back, John!                  │
│ [Dashboard]  │                                       │
│ Orders       │ ┌──────────────┬──────────────┐     │
│ Wishlist     │ │ Total Orders │ Total Spent  │     │
│ Addresses    │ │     12       │   $2,456.89  │     │
│ Profile      │ └──────────────┴──────────────┘     │
│ Password     │                                       │
│ [Logout]     │ RECENT ORDERS                        │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ Order #UC-001234                │  │
│              │ │ Date: Oct 9, 2025              │  │
│              │ │ Status: Shipped                 │  │
│              │ │ Total: $267.67                  │  │
│              │ │ [Track] [View Details]          │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ Order #UC-001220                │  │
│              │ │ Date: Oct 5, 2025              │  │
│              │ │ Status: Delivered               │  │
│              │ │ Total: $145.99                  │  │
│              │ │ [Reorder] [Write Review]        │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ [View All Orders →]                  │
│              │                                       │
│              │ WISHLIST (5 items)                   │
│              │ [Product] [Product] [Product]        │
│              │ [View All Wishlist →]                │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Quick stats overview
- Recent order list
- Quick actions (track, reorder, review)
- Wishlist preview
- Sidebar navigation

**Interactions:**
- Click sidebar item → Navigate to section
- Track → Order tracking page
- View Details → Order details
- Reorder → Add all items to cart

---

### Screen 11: My Orders (Order History)

**Purpose:**  
View all past and current orders with filtering.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                               │
├─────────────────────────────────────────────────────┤
│ My Orders                                            │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ ORDER LIST                            │
│ (Same as     │                                       │
│  Dashboard)  │ Filter: [All ▼] [Last 30 Days ▼]    │
│              │ Search: [_____________]  [🔍]        │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ Order #UC-001234    Oct 9, 2025 │  │
│              │ │ ────────────────────────────────│  │
│              │ │ [Image] Product Name            │  │
│              │ │ [Image] +2 more items           │  │
│              │ │                                 │  │
│              │ │ Status: ● Shipped               │  │
│              │ │ Track #: 1Z999AA10123456784     │  │
│              │ │ Arriving: Dec 15-22             │  │
│              │ │                                 │  │
│              │ │ Total: $267.67                  │  │
│              │ │                                 │  │
│              │ │ [Track Package] [View Details]  │  │
│              │ │ [Download Invoice]              │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ Order #UC-001220    Oct 5, 2025 │  │
│              │ │ ────────────────────────────────│  │
│              │ │ [Image] Product Name            │  │
│              │ │                                 │  │
│              │ │ Status: ✓ Delivered             │  │
│              │ │ Delivered on: Oct 10, 2025      │  │
│              │ │                                 │  │
│              │ │ Total: $145.99                  │  │
│              │ │                                 │  │
│              │ │ [Reorder] [Write Review]        │  │
│              │ │ [Return Item]                   │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ [1] [2] [3] [4] [5] - Pagination    │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Order filtering (All, Pending, Shipped, Delivered, Cancelled)
- Date range filter
- Search by order number or product name
- Status indicators with colors
- Quick actions per order

**Interactions:**
- Click order → Order details page
- Track Package → Tracking page
- Download Invoice → PDF download
- Return Item → Return flow

---

### Screen 12: Order Details & Tracking

**Purpose:**  
Detailed view of specific order with tracking information.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                               │
├─────────────────────────────────────────────────────┤
│ Order #UC-001234                                     │
│ [← Back to Orders]                                   │
├─────────────────────────────────────────────────────┤
│ ORDER STATUS                                         │
│                                                      │
│ ● ─────── ● ─────── ◉ ─────── ○                    │
│ Confirmed  Processing Shipped  Delivered            │
│ Oct 9      Oct 10    Oct 12    Dec 15-22           │
│                                                      │
│ Tracking #: 1Z999AA10123456784                      │
│ Carrier: UPS                                         │
│ Estimated Delivery: December 15-22, 2025            │
│                                                      │
│ [Track on UPS Website →]                            │
├─────────────────────────────────────────────────────┤
│ ORDER ITEMS                                          │
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ [Image] Product Name                            ││
│ │ Color: Black, Size: M                           ││
│ │ Qty: 2 × $49.99 = $99.98                        ││
│ │ [Write Review] [Buy Again]                      ││
│ └─────────────────────────────────────────────────┘│
│                                                      │
│ ┌─────────────────────────────────────────────────┐│
│ │ [Image] Product Name                            ││
│ │ Qty: 1 × $99.99                                 ││
│ │ [Write Review] [Buy Again]                      ││
│ └─────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────┤
│ SHIPPING & PAYMENT                                   │
│                                                      │
│ ┌──────────────────┬──────────────────────────────┐│
│ │ Shipping Address │ Payment Method               ││
│ │ John Doe         │ Visa ending in 1234          ││
│ │ 123 Main St      │                              ││
│ │ New York, NY     │ Subtotal:    $248.97         ││
│ │ (555) 123-4567   │ Shipping:    $9.99           ││
│ │                  │ Tax:         $18.71          ││
│ │                  │ Discount:    -$10.00         ││
│ │                  │ ──────────────────           ││
│ │                  │ Total:       $267.67         ││
│ └──────────────────┴──────────────────────────────┘│
│                                                      │
│ [Download Invoice] [Cancel Order] [Need Help?]      │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Visual order status timeline
- Tracking number with carrier link
- Item-level actions (review, buy again)
- Order cancellation (if eligible)
- Invoice download
- Customer support link

**Interactions:**
- Track on carrier → External tracking page
- Write Review → Review form
- Buy Again → Add to cart
- Cancel Order → Cancellation flow
- Download Invoice → PDF

---

### Screen 13: Login Page

**Purpose:**  
User authentication entry point.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Minimal - Logo only)                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│              LOGIN TO YOUR ACCOUNT                   │
│                                                      │
│     ┌──────────────────────────────────────┐       │
│     │ Email Address                         │       │
│     │ [____________________________]        │       │
│     │                                       │       │
│     │ Password                              │       │
│     │ [____________________________]        │       │
│     │ [👁 Show]                             │       │
│     │                                       │       │
│     │ □ Remember me                         │       │
│     │                                       │       │
│     │ [Login Button]                        │       │
│     │                                       │       │
│     │ [Forgot Password?]                    │       │
│     │                                       │       │
│     │ ──────── OR ────────                  │       │
│     │                                       │       │
│     │ [Continue with Google]                │       │
│     │ [Continue with Facebook]              │       │
│     │                                       │       │
│     │ Don't have an account? [Sign Up]      │       │
│     └──────────────────────────────────────┘       │
│                                                      │
│              [Continue as Guest →]                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Email/password authentication
- Password visibility toggle
- Remember me option
- Social login (Google, Facebook)
- Guest checkout option
- Form validation with error messages

**Interactions:**
- Login → Redirect to previous page or account dashboard
- Forgot Password → Password reset flow
- Sign Up → Registration page
- Social login → OAuth flow
- Guest → Checkout as guest

---

### Screen 14: Registration Page

**Purpose:**  
Create new user account.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Minimal - Logo only)                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│              CREATE YOUR ACCOUNT                     │
│                                                      │
│     ┌──────────────────────────────────────┐       │
│     │ First Name                            │       │
│     │ [____________________________]        │       │
│     │                                       │       │
│     │ Last Name                             │       │
│     │ [____________________________]        │       │
│     │                                       │       │
│     │ Email Address                         │       │
│     │ [____________________________]        │       │
│     │                                       │       │
│     │ Password                              │       │
│     │ [____________________________]        │       │
│     │ Must be at least 8 characters         │       │
│     │                                       │       │
│     │ Password Strength: [████░░] Medium    │       │
│     │                                       │       │
│     │ Confirm Password                      │       │
│     │ [____________________________]        │       │
│     │                                       │       │
│     │ □ I agree to Terms & Conditions       │       │
│     │   and Privacy Policy                  │       │
│     │                                       │       │
│     │ [Create Account]                      │       │
│     │                                       │       │
│     │ ──────── OR ────────                  │       │
│     │                                       │       │
│     │ [Sign up with Google]                 │       │
│     │ [Sign up with Facebook]               │       │
│     │                                       │       │
│     │ Already have an account? [Login]      │       │
│     └──────────────────────────────────────┘       │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Real-time password strength indicator
- Password match validation
- Email format validation
- Terms acceptance requirement
- Social signup options

**Interactions:**
- Create Account → Email verification sent
- Validation errors → Inline error messages
- Social signup → OAuth flow
- Login link → Login page

---

### Screen 15: Wishlist Page

**Purpose:**  
Display and manage saved products.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ HEADER                                               │
├─────────────────────────────────────────────────────┤
│ My Wishlist (5 items)                               │
├─────────────────────────────────────────────────────┤
│                                                      │
│ ┌──────────┬────────────────────────────────────┐  │
│ │ [Image]  │ Product Name                       │  │
│ │          │ ⭐⭐⭐⭐⭐ 4.8 (234 reviews)        │  │
│ │          │                                    │  │
│ │          │ $99.99  $129.99 (23% off)         │  │
│ │          │ In Stock                           │  │
│ │          │                                    │  │
│ │          │ [Add to Cart] [Remove] [X]        │  │
│ └──────────┴────────────────────────────────────┘  │
│                                                      │
│ ┌──────────┬────────────────────────────────────┐  │
│ │ [Image]  │ Product Name                       │  │
│ │          │ ⭐⭐⭐⭐ 4.5                        │  │
│ │          │                                    │  │
│ │          │ $49.99                             │  │
│ │          │ Out of Stock                       │  │
│ │          │                                    │  │
│ │          │ [Notify Me] [Remove] [X]          │  │
│ └──────────┴────────────────────────────────────┘  │
│                                                      │
│ [More items...]                                      │
│                                                      │
│ [Add All to Cart]  [Share Wishlist]                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Key Functionalities:**
- Product availability status
- Price tracking (show if price dropped)
- Quick add to cart
- Remove from wishlist
- Notify when back in stock
- Share wishlist

**Interactions:**
- Add to Cart → Add item + success toast
- Remove → Remove from wishlist
- Notify Me → Email notification setup
- Click product → Product detail page

---

### 4.2 Admin Panel Screens

---

### Screen 16: Admin Dashboard

**Purpose:**  
Overview of business metrics and quick access to admin functions.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ ADMIN HEADER                                         │
│ [Logo] UniCart Admin         [Notifications] [Admin]│
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ DASHBOARD                             │
│              │                                       │
│ [Dashboard]  │ KEY METRICS (Today)                  │
│ Products     │ ┌────────┬────────┬────────┬────────┐│
│ Orders       │ │ Revenue│ Orders │ Users  │Products││
│ Customers    │ │$12,345 │  156   │  45    │ 1,234 ││
│ Categories   │ │ +12%   │  +8%   │ +23%   │ +5%   ││
│ Coupons      │ └────────┴────────┴────────┴────────┘│
│ Analytics    │                                       │
│ Settings     │ SALES CHART (Last 7 Days)            │
│ [Logout]     │ ┌─────────────────────────────────┐  │
│              │ │ [Bar/Line Chart Visualization]  │  │
│              │ │                                 │  │
│              │ │                                 │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌──────────────┬──────────────────┐  │
│              │ │ RECENT ORDERS│ LOW STOCK ALERTS ││
│              │ │              │                  ││
│              │ │ #UC-001234   │ iPhone 15 Pro    ││
│              │ │ $267.67      │ Stock: 3 left    ││
│              │ │ Pending      │                  ││
│              │ │              │ MacBook Air      ││
│              │ │ #UC-001233   │ Stock: 5 left    ││
│              │ │ $145.99      │                  ││
│              │ │ Processing   │ [View All]       ││
│              │ │              │                  ││
│              │ │ [View All]   │                  ││
│              │ └──────────────┴──────────────────┘  │
│              │                                       │
│              │ TOP PRODUCTS (This Month)            │
│              │ 1. iPhone 15 Pro - 234 sold          │
│              │ 2. MacBook Air - 156 sold            │
│              │ 3. AirPods Pro - 145 sold            │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Real-time metrics with trends
- Sales visualization charts
- Recent orders preview
- Low stock alerts
- Top products list
- Quick navigation sidebar

**Interactions:**
- Click metric card → Detailed view
- Click order → Order details
- Low stock alert → Inventory page
- Chart period selector (day/week/month/year)

---

### Screen 17: Admin - Product List

**Purpose:**  
Manage all products with search, filter, and bulk actions.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ ADMIN HEADER                                         │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ PRODUCTS                              │
│              │                                       │
│              │ [+ Add New Product]                  │
│              │                                       │
│              │ Search: [________] [🔍]              │
│              │ Filter: [All ▼] [Category ▼]         │
│              │ [Export CSV]                          │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │☐│Image│Name   │Cat│Price│Stock││  │
│              │ ├─────────────────────────────────┤  │
│              │ │☐│[img]│iPhone │Ele│$999 │ 45  ││  │
│              │ │ │     │15 Pro │   │     │     ││  │
│              │ │ │     │[Edit] [Delete] [View] ││  │
│              │ ├─────────────────────────────────┤  │
│              │ │☐│[img]│MacBook│Ele│$1299│ 12  ││  │
│              │ │ │     │Air M2 │   │     │     ││  │
│              │ │ │     │[Edit] [Delete] [View] ││  │
│              │ ├─────────────────────────────────┤  │
│              │ │☐│[img]│AirPods│Ele│$249 │ 156 ││  │
│              │ │ │     │Pro 2  │   │     │     ││  │
│              │ │ │     │[Edit] [Delete] [View] ││  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ Bulk Actions: [Delete] [Update Stock]│
│              │                                       │
│              │ [1] [2] [3] [4] [5] - Pagination    │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Product search and filters
- Bulk selection and actions
- Quick edit/delete/view
- Stock level indicators (red if low)
- Export to CSV
- Pagination or infinite scroll

**Interactions:**
- Add Product → Product form
- Edit → Edit product page
- Delete → Confirmation modal
- View → Product detail (customer view)
- Bulk delete → Confirmation

---

### Screen 18: Admin - Add/Edit Product

**Purpose:**  
Create or modify product information.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ ADMIN HEADER                                         │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ ADD NEW PRODUCT                       │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ BASIC INFORMATION               │  │
│              │ │                                 │  │
│              │ │ Product Name *                  │  │
│              │ │ [________________________]      │  │
│              │ │                                 │  │
│              │ │ Short Description               │  │
│              │ │ [________________________]      │  │
│              │ │                                 │  │
│              │ │ Full Description *              │  │
│              │ │ [Rich Text Editor]              │  │
│              │ │                                 │  │
│              │ │ Category * [Electronics ▼]      │  │
│              │ │ Brand [Apple ▼]                 │  │
│              │ │ SKU [________]                  │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ PRICING & INVENTORY             │  │
│              │ │                                 │  │
│              │ │ Price * [$____.__]              │  │
│              │ │ Compare Price [$____.__]        │  │
│              │ │ Cost Price [$____.__]           │  │
│              │ │                                 │  │
│              │ │ Stock Quantity * [____]         │  │
│              │ │ Low Stock Threshold [10]        │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ IMAGES                          │  │
│              │ │                                 │  │
│              │ │ [Upload Images]                 │  │
│              │ │ ┌────┐ ┌────┐ ┌────┐           │  │
│              │ │ │img1│ │img2│ │img3│           │  │
│              │ │ │[X] │ │[X] │ │[X] │           │  │
│              │ │ └────┘ └────┘ └────┘           │  │
│              │ │ Drag to reorder                 │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ VARIANTS (Optional)             │  │
│              │ │                                 │  │
│              │ │ [+ Add Variant Group]           │  │
│              │ │                                 │  │
│              │ │ Color: Red, Blue, Black         │  │
│              │ │ Size: S, M, L, XL               │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ SEO & VISIBILITY                │  │
│              │ │                                 │  │
│              │ │ □ Active (Visible to customers) │  │
│              │ │ □ Featured Product              │  │
│              │ │                                 │  │
│              │ │ Meta Title [_______________]    │  │
│              │ │ Meta Description [_________]    │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ [Cancel] [Save as Draft] [Publish]  │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Rich text editor for description
- Image upload with drag-to-reorder
- Variant management (color, size, etc.)
- SEO fields
- Save as draft or publish
- Form validation

**Interactions:**
- Upload images → Image preview
- Add variant → Variant configuration
- Save → Validate and save
- Publish → Make live
- Cancel → Confirm if unsaved changes

---

### Screen 19: Admin - Order Management

**Purpose:**  
View and manage customer orders.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ ADMIN HEADER                                         │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ ORDERS                                │
│              │                                       │
│              │ Filter: [All ▼] [Today ▼]            │
│              │ Search: [Order # or Customer] [🔍]   │
│              │ [Export CSV]                          │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │Order#│Customer│Date  │Total│Status││
│              │ ├─────────────────────────────────┤  │
│              │ │UC-   │John Doe│Oct 9 │$267 │●Pend││
│              │ │001234│        │2:30PM│     │ing  ││
│              │ │      │[View Details]            ││  │
│              │ ├─────────────────────────────────┤  │
│              │ │UC-   │Jane S. │Oct 9 │$145 │●Proc││
│              │ │001233│        │1:15PM│     │essin││
│              │ │      │[View Details]            ││  │
│              │ ├─────────────────────────────────┤  │
│              │ │UC-   │Mike J. │Oct 8 │$599 │●Ship││
│              │ │001220│        │5:45PM│     │ped  ││
│              │ │      │[View Details]            ││  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ Status Legend:                        │
│              │ ● Pending ● Processing ● Shipped     │
│              │ ● Delivered ● Cancelled ● Refunded   │
│              │                                       │
│              │ [1] [2] [3] [4] [5] - Pagination    │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Order filtering by status and date
- Search by order number or customer
- Status color coding
- Quick view details
- Export orders to CSV
- Real-time updates

**Interactions:**
- View Details → Order detail page
- Click status → Filter by that status
- Export → Download CSV

---

### Screen 20: Admin - Order Details

**Purpose:**  
Manage individual order and update status.

**Layout/Sections:**

```
┌─────────────────────────────────────────────────────┐
│ ADMIN HEADER                                         │
├──────────────┬──────────────────────────────────────┤
│ SIDEBAR      │ ORDER #UC-001234                      │
│              │ [← Back to Orders]                    │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ ORDER STATUS                    │  │
│              │ │                                 │  │
│              │ │ Current: Pending                │  │
│              │ │ Update to: [Processing ▼]       │  │
│              │ │ [Update Status]                 │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ CUSTOMER INFORMATION            │  │
│              │ │ Name: John Doe                  │  │
│              │ │ Email: john.doe@email.com       │  │
│              │ │ Phone: (555) 123-4567           │  │
│              │ │ [Email Customer] [View Profile] │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌─────────────────────────────────┐  │
│              │ │ ORDER ITEMS                     │  │
│              │ │ [Image] Product Name            │  │
│              │ │ Qty: 2 × $49.99 = $99.98        │  │
│              │ │                                 │  │
│              │ │ [Image] Product Name            │  │
│              │ │ Qty: 1 × $99.99                 │  │
│              │ │                                 │  │
│              │ │ Subtotal: $248.97               │  │
│              │ │ Shipping: $9.99                 │  │
│              │ │ Tax: $18.71                     │  │
│              │ │ Total: $277.67                  │  │
│              │ └─────────────────────────────────┘  │
│              │                                       │
│              │ ┌──────────────┬──────────────────┐  │
│              │ │ SHIPPING     │ PAYMENT          ││  │
│              │ │ 123 Main St  │ Visa ****1234    ││  │
│              │ │ New York, NY │ Status: Paid     ││  │
│              │ │              │ Amount: $277.67  ││  │
│              │ │ Tracking:    │                  ││  │
│              │ │ [Add #]      │ [Refund]         ││  │
│              │ └──────────────┴──────────────────┘  │
│              │                                       │
│              │ [Print Invoice] [Cancel Order]       │
│              │ [Send Notification Email]            │
└──────────────┴──────────────────────────────────────┘
```

**Key Functionalities:**
- Order status update dropdown
- Customer contact options
- Add tracking number
- Process refund
- Print invoice
- Send email notification
- Cancel order

**Interactions:**
- Update Status → Change order status + notify customer
- Add Tracking → Save tracking number
- Refund → Refund processing
- Email Customer → Email template
- Print Invoice → PDF invoice

---

## 5. Design System & UI Components

### 5.1 Color Palette

**Primary Colors:**
- Primary: `#2563eb` (Blue) - CTAs, links
- Secondary: `#64748b` (Slate) - Secondary text
- Success: `#10b981` (Green) - Success states
- Warning: `#f59e0b` (Amber) - Warnings
- Error: `#ef4444` (Red) - Errors, alerts
- Info: `#06b6d4` (Cyan) - Information

**Neutral Colors:**
- Background: `#ffffff` (White)
- Surface: `#f8fafc` (Light Gray)
- Border: `#e2e8f0` (Light Gray)
- Text Primary: `#0f172a` (Dark)
- Text Secondary: `#64748b` (Slate)

### 5.2 Typography

**Font Family:** Inter, system-ui, sans-serif

**Font Sizes:**
- Heading 1: 36px / 2.25rem
- Heading 2: 30px / 1.875rem
- Heading 3: 24px / 1.5rem
- Heading 4: 20px / 1.25rem
- Body: 16px / 1rem
- Small: 14px / 0.875rem
- Tiny: 12px / 0.75rem

### 5.3 Spacing System

Based on 8px grid:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### 5.4 Component Library

**Buttons:**
- Primary: Solid background, white text
- Secondary: Outlined, transparent background
- Tertiary: Text only, no background
- Sizes: Small (32px), Medium (40px), Large (48px)

**Input Fields:**
- Height: 40px (medium), 48px (large)
- Border: 1px solid, rounded corners (6px)
- Focus state: Blue border, shadow

**Cards:**
- Border radius: 8px
- Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Padding: 16px-24px

**Badges:**
- Status indicators: Pill shape, small text
- Colors: Match status (pending=yellow, shipped=blue, delivered=green)

---

## 6. Responsive Breakpoints

- **Mobile:** < 640px (320px minimum)
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px
- **Large Desktop:** > 1440px

**Mobile Adaptations:**
- Hamburger menu for navigation
- Stacked layouts
- Bottom sheet for filters
- Floating action buttons
- Simplified tables (card view)

---

## 7. Accessibility Guidelines

- **Keyboard Navigation:** All interactive elements accessible via keyboard
- **Screen Readers:** Proper ARIA labels and semantic HTML
- **Color Contrast:** WCAG AA compliance (4.5:1 for text)
- **Focus Indicators:** Visible focus states
- **Alt Text:** All images have descriptive alt text
- **Form Labels:** All inputs have associated labels
- **Error Messages:** Clear, actionable error messages

---

## 8. Loading & Error States

**Loading States:**
- Skeleton screens for initial load
- Spinners for actions (buttons, forms)
- Progress bars for uploads
- Shimmer effect for placeholders

**Empty States:**
- Empty cart: Icon + message + "Continue Shopping" CTA
- No search results: Suggestions + "Clear filters" option
- Empty wishlist: Icon + "Browse Products" CTA

**Error States:**
- 404 Page: Friendly message + search + homepage link
- 500 Error: "Something went wrong" + retry button
- Form errors: Inline validation with red text
- Network errors: Toast notifications

---

## 9. Micro-interactions

- **Add to Cart:** Button animates, cart badge bounces
- **Wishlist Heart:** Fills with animation on click
- **Image Hover:** Zoom effect on product images
- **Notifications:** Toast slides in from top-right
- **Dropdown:** Smooth expand/collapse
- **Form Validation:** Shake animation on error
- **Success:** Checkmark animation
- **Loading:** Pulsing skeleton

---

## 10. Performance Considerations

- **Lazy Loading:** Images load as user scrolls
- **Image Optimization:** WebP format, responsive images
- **Code Splitting:** Route-based chunks
- **Infinite Scroll:** For long product lists (vs pagination)
- **Debounced Search:** 300ms delay on search input
- **Optimistic UI:** Update UI before server response
- **Caching:** Cache product data, user data

---

**End of UI/UX Wireframes Document**

**Next Steps:**
1. Review and approve wireframes
2. Create high-fidelity mockups in Figma
3. Develop interactive prototypes
4. Conduct user testing
5. Begin frontend development

**Document Approval:**

| Role | Name | Date |
|------|------|------|
| Product Owner | ___________ | ___________ |
| UI/UX Designer | ___________ | ___________ |
| Frontend Lead | ___________ | ___________ |
| Stakeholders | ___________ | ___________ |

