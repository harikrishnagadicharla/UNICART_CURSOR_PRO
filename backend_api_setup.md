# Backend API Setup Guide - Complete Troubleshooting

This document covers all major backend API issues encountered during development and their solutions for future reference.

## 📋 Table of Contents
1. [Database Connection Issues](#database-connection-issues)
2. [API Endpoint Problems](#api-endpoint-problems)
3. [Authentication Issues](#authentication-issues)
4. [Image Handling Problems](#image-handling-problems)
5. [Wishlist Functionality Issues](#wishlist-functionality-issues)
6. [Frontend-Backend Integration](#frontend-backend-integration)
7. [Performance Optimization](#performance-optimization)
8. [Deployment Issues](#deployment-issues)

---

## 🗄️ Database Connection Issues

### **Issue 1: EPERM Permission Errors (Windows)**
**Problem**: Prisma can't rename files during generation
```
EPERM: operation not permitted, rename 'query_engine-windows.dll.node.tmp' -> 'query_engine-windows.dll.node'
```

**Solutions**:
```bash
# Option 1: Force regenerate
npx prisma generate --force

# Option 2: Run as Administrator
# Right-click PowerShell -> Run as Administrator
npm install --force

# Option 3: Use Yarn instead
npm install -g yarn
yarn install
```

### **Issue 2: Database Connection Timeouts**
**Problem**: Intermittent connection failures with Neon database
```
Can't reach database server at ep-calm-paper-a4kdhrw5-pooler.us-east-1.aws.neon.tech:5432
```

**Solution**: Add connection pooling to DATABASE_URL
```env
# Before (causing timeouts)
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# After (with connection pooling)
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require&connection_limit=1&pool_timeout=20"
```

### **Issue 3: Database Schema Not Synced**
**Problem**: API calls fail because tables don't exist

**Solution**: Complete database setup sequence
```bash
# 1. Generate Prisma client
npx prisma generate

# 2. Push schema to database
npx prisma db push

# 3. Seed with sample data
npm run db:seed

# 4. Verify with Prisma Studio
npx prisma studio
```

---

## 🔌 API Endpoint Problems

### **Issue 4: API Routes Not Responding**
**Problem**: Postman shows "Sending request..." indefinitely

**Root Causes & Solutions**:
1. **Database Connection Issues**
   - Fix: Update DATABASE_URL with connection pooling
   - Verify: Check terminal logs for P1001 errors

2. **Missing Environment Variables**
   ```env
   # Required variables
   DATABASE_URL="your_database_url"
   JWT_SECRET="your_jwt_secret"
   JWT_EXPIRES_IN="7d"
   ```

3. **Prisma Client Not Generated**
   ```bash
   npx prisma generate
   ```

### **Issue 5: CORS Issues**
**Problem**: Frontend can't call backend APIs

**Solution**: Add CORS headers to API routes
```typescript
// In API route files
export async function GET(request: NextRequest) {
  const response = NextResponse.json(data);
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}
```

### **Issue 6: API Response Timeouts**
**Problem**: APIs taking 5+ seconds to respond

**Solutions**:
1. **Database Connection Pooling** (as mentioned above)
2. **Add Request Timeouts**
   ```typescript
   // In API routes
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
   
   try {
     const result = await prisma.category.findMany({
       signal: controller.signal
     });
     clearTimeout(timeoutId);
     return NextResponse.json(result);
   } catch (error) {
     clearTimeout(timeoutId);
     return NextResponse.json({ error: 'Request timeout' }, { status: 408 });
   }
   ```

---

## 🔐 Authentication Issues

### **Issue 7: JWT Token Validation Failures**
**Problem**: API returns 401 Unauthorized even with valid tokens

**Solutions**:
1. **Check JWT Secret**
   ```env
   JWT_SECRET="your-super-secret-jwt-key-min-32-characters"
   ```

2. **Verify Token Format**
   ```typescript
   // In middleware
   const token = request.headers.get('authorization')?.replace('Bearer ', '');
   if (!token) {
     return NextResponse.json({ error: 'No token provided' }, { status: 401 });
   }
   ```

3. **Check Token Expiration**
   ```typescript
   const payload = verifyToken(token);
   if (!payload || payload.exp < Date.now() / 1000) {
     return NextResponse.json({ error: 'Token expired' }, { status: 401 });
   }
   ```

### **Issue 8: User Session Management**
**Problem**: Users getting logged out unexpectedly

**Solution**: Implement proper session handling
```typescript
// In auth middleware
export async function withAuth(request: NextRequest, handler: Function) {
  try {
    const token = extractTokenFromHeader(request.headers.get('authorization'));
    
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, isActive: true }
    });

    if (!user || !user.isActive) {
      return NextResponse.json({ error: 'User not found or inactive' }, { status: 401 });
    }

    return handler(request, user);
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}
```

---

## 🖼️ Image Handling Problems

### **Issue 9: Placeholder Images Not Loading**
**Problem**: All product images showing as "Out of Stock" placeholders

**Root Cause**: Using `/placeholder-image.svg` that doesn't exist

**Solution**: Replace with proper image URLs
```typescript
// Before (causing issues)
<Image src={product.images[0]?.url || "/placeholder-image.svg"} />

// After (working solution)
<Image 
  src={product.images[0]?.url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&auto=format"} 
  onError={(e) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&auto=format";
  }}
/>
```

### **Issue 10: Next.js Image Optimization Issues**
**Problem**: Images not loading due to domain restrictions

**Solution**: Update `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

## ❤️ Wishlist Functionality Issues

### **Issue 11: TypeScript Errors in Wishlist**
**Problem**: Type mismatches between WishlistItem and Product types

**Solution**: Proper type handling
```typescript
// Before (causing errors)
{wishlistItems.map((product) => {
  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
  // ... product properties not accessible
})}

// After (working solution)
{wishlistItems.map((item) => {
  const product = item.product;
  const discount = product.comparePrice ? calculateDiscount(product.price, product.comparePrice) : 0;
  // ... now product properties are accessible
})}
```

### **Issue 12: Wishlist API Endpoints Not Working**
**Problem**: Add/remove from wishlist failing

**Solutions**:
1. **Check Authentication**
   ```typescript
   // Ensure user is authenticated
   const token = request.headers.get('authorization')?.replace('Bearer ', '');
   if (!token) {
     return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
   }
   ```

2. **Validate Product Existence**
   ```typescript
   const product = await prisma.product.findUnique({
     where: { id: productId, isActive: true },
     select: { id: true }
   });

   if (!product) {
     return NextResponse.json({ error: 'Product not found' }, { status: 404 });
   }
   ```

3. **Handle Duplicate Entries**
   ```typescript
   const existingItem = await prisma.wishlistItem.findUnique({
     where: {
       userId_productId: {
         userId: req.user!.id,
         productId: productId
       }
     }
   });

   if (existingItem) {
     return NextResponse.json({ error: 'Product already in wishlist' }, { status: 400 });
   }
   ```

---

## 🔗 Frontend-Backend Integration

### **Issue 13: API Calls Not Reaching Backend**
**Problem**: Frontend making calls but backend not receiving them

**Solutions**:
1. **Check API Route Structure**
   ```
   app/
   ├── api/
   │   ├── auth/
   │   │   ├── login/
   │   │   │   └── route.ts
   │   │   └── register/
   │   │       └── route.ts
   │   ├── products/
   │   │   └── route.ts
   │   └── wishlist/
   │       └── route.ts
   ```

2. **Verify HTTP Methods**
   ```typescript
   // In API routes
   export async function GET(request: NextRequest) { /* ... */ }
   export async function POST(request: NextRequest) { /* ... */ }
   export async function PUT(request: NextRequest) { /* ... */ }
   export async function DELETE(request: NextRequest) { /* ... */ }
   ```

3. **Check Request Headers**
   ```typescript
   // In frontend
   const response = await fetch('/api/wishlist', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ productId })
   });
   ```

### **Issue 14: Static Data vs Dynamic Data**
**Problem**: Frontend showing static data instead of database data

**Solutions**:
1. **Remove Static Data**
   ```typescript
   // Remove hardcoded data
   // const staticProducts = [...]; // DELETE THIS
   
   // Use API calls instead
   const [products, setProducts] = useState([]);
   
   useEffect(() => {
     fetch('/api/products')
       .then(res => res.json())
       .then(data => setProducts(data.products));
   }, []);
   ```

2. **Implement Proper State Management**
   ```typescript
   // Use Zustand or Context for global state
   const useProductStore = create((set) => ({
     products: [],
     setProducts: (products) => set({ products }),
     fetchProducts: async () => {
       const response = await fetch('/api/products');
       const data = await response.json();
       set({ products: data.products });
     }
   }));
   ```

---

## ⚡ Performance Optimization

### **Issue 15: Slow API Response Times**
**Problem**: APIs taking too long to respond

**Solutions**:
1. **Database Query Optimization**
   ```typescript
   // Before (slow)
   const products = await prisma.product.findMany({
     include: {
       images: true,
       category: true,
       reviews: true
     }
   });

   // After (optimized)
   const products = await prisma.product.findMany({
     select: {
       id: true,
       name: true,
       price: true,
       images: {
         select: { url: true, alt: true },
         take: 1
       },
       category: {
         select: { name: true }
       }
     }
   });
   ```

2. **Add Caching**
   ```typescript
   // Add response caching
   export async function GET(request: NextRequest) {
     const categories = await prisma.category.findMany();
     
     const response = NextResponse.json(categories);
     response.headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes
     return response;
   }
   ```

3. **Implement Pagination**
   ```typescript
   export async function GET(request: NextRequest) {
     const { searchParams } = new URL(request.url);
     const page = parseInt(searchParams.get('page') || '1');
     const limit = parseInt(searchParams.get('limit') || '10');
     const skip = (page - 1) * limit;

     const products = await prisma.product.findMany({
       skip,
       take: limit,
       orderBy: { createdAt: 'desc' }
     });

     return NextResponse.json({ products, page, limit });
   }
   ```

---

## 🚀 Deployment Issues

### **Issue 16: Build Failures**
**Problem**: `npm run build` failing

**Solutions**:
1. **Fix TypeScript Errors**
   ```bash
   npm run type-check
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "build": "prisma generate && next build",
       "postinstall": "prisma generate"
     }
   }
   ```

3. **Environment Variables**
   ```env
   # Production environment variables
   DATABASE_URL="your_production_database_url"
   JWT_SECRET="your_production_jwt_secret"
   NODE_ENV="production"
   ```

### **Issue 17: Vercel Deployment Issues**
**Problem**: App not working after deployment

**Solutions**:
1. **Add vercel.json**
   ```json
   {
     "buildCommand": "prisma generate && next build",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```

2. **Set Environment Variables in Vercel**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: DATABASE_URL, JWT_SECRET, NODE_ENV

3. **Database Migration**
   ```bash
   # Run migrations in production
   npx prisma migrate deploy
   ```

---

## 📝 Best Practices Summary

### **Database Setup Checklist**
- [ ] DATABASE_URL configured with connection pooling
- [ ] Prisma schema synced (`npx prisma db push`)
- [ ] Sample data seeded (`npm run db:seed`)
- [ ] Prisma client generated (`npx prisma generate`)

### **API Development Checklist**
- [ ] Proper HTTP methods implemented
- [ ] Authentication middleware added
- [ ] Error handling implemented
- [ ] Response caching configured
- [ ] CORS headers set

### **Frontend Integration Checklist**
- [ ] Static data removed
- [ ] API calls implemented
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] State management configured

### **Performance Checklist**
- [ ] Database queries optimized
- [ ] Image optimization configured
- [ ] Caching implemented
- [ ] Pagination added
- [ ] Connection pooling configured

---

## 🔧 Quick Fix Commands

```bash
# Complete database reset
npx prisma db push --force-reset
npm run db:seed

# Fix Prisma issues
npx prisma generate --force
npx prisma db push

# Fix npm issues
rm -rf node_modules package-lock.json
npm install

# Test API endpoints
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/products

# Check database
npx prisma studio
```

---

## 📞 Common Error Codes & Solutions

| Error Code | Problem | Solution |
|------------|---------|----------|
| P1001 | Database connection failed | Check DATABASE_URL, add connection pooling |
| P2002 | Unique constraint failed | Handle duplicate entries properly |
| 401 | Unauthorized | Check JWT token and authentication |
| 404 | Not found | Verify API route structure |
| 500 | Internal server error | Check server logs, database connection |

---

This guide covers all major backend API issues encountered during development. Keep this document handy for future projects to avoid repeating the same mistakes and quickly resolve common issues.
