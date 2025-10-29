# 🔧 API Integration Fixing Prompt - Complete Guide

## 📋 **Use This Prompt For Future Projects**

When you encounter API integration issues in your Next.js/React projects, use this comprehensive prompt to identify and fix all common problems.

---

## 🚨 **Common API Integration Issues & Solutions**

### **Issue 1: Frontend Not Calling APIs**
**Problem**: Frontend components use static data/localStorage instead of API calls
**Symptoms**: 
- No API requests in Network tab
- Data doesn't update from database
- Components show static/empty data

**Solution Pattern**:
```javascript
// ❌ WRONG - Using static data
useEffect(() => {
  setData(staticData);
}, []);

// ✅ CORRECT - Using API calls
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint');
      const data = await response.json();
      if (data.success) {
        setData(data.results);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Fallback to static data
      setData(staticData);
    }
  };
  fetchData();
}, []);
```

### **Issue 2: Missing Authentication Headers**
**Problem**: Protected APIs return 401 Unauthorized
**Symptoms**:
- 401 errors in Network tab
- "Unauthorized" responses
- User data not loading

**Solution Pattern**:
```javascript
// ❌ WRONG - Missing auth header
const response = await fetch('/api/protected-endpoint');

// ✅ CORRECT - With authentication
const token = localStorage.getItem('auth_token');
const response = await fetch('/api/protected-endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### **Issue 3: Incorrect HTTP Methods**
**Problem**: Using wrong HTTP method for API calls
**Symptoms**:
- 405 Method Not Allowed errors
- Data not being sent/received properly

**Solution Pattern**:
```javascript
// ❌ WRONG - GET for data submission
fetch('/api/login', { method: 'GET' });

// ✅ CORRECT - POST for data submission
fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

### **Issue 4: Missing Error Handling**
**Problem**: No error handling for failed API calls
**Symptoms**:
- App crashes on API failures
- No user feedback on errors
- Poor user experience

**Solution Pattern**:
```javascript
// ❌ WRONG - No error handling
const response = await fetch('/api/data');
const data = await response.json();

// ✅ CORRECT - With error handling
try {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  if (data.success) {
    setData(data.results);
  } else {
    throw new Error(data.error || 'API call failed');
  }
} catch (error) {
  console.error('API Error:', error);
  setError(error.message);
  // Fallback or user notification
}
```

### **Issue 5: Missing Loading States**
**Problem**: No loading indicators during API calls
**Symptoms**:
- Users don't know if data is loading
- Poor user experience
- Appears broken

**Solution Pattern**:
```javascript
// ✅ CORRECT - With loading state
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  fetchData();
}, []);

if (isLoading) {
  return <LoadingSpinner />;
}
```

---

## 🔍 **Step-by-Step Debugging Process**

### **Step 1: Check Network Tab**
1. Open Chrome DevTools → Network tab
2. Look for API requests to your endpoints
3. Check request status codes (200 = success, 4xx/5xx = error)

### **Step 2: Verify API Endpoints**
1. Test APIs directly in Postman/curl
2. Check if endpoints exist and return correct data
3. Verify authentication requirements

### **Step 3: Check Frontend Integration**
1. Look for `fetch()` calls in components
2. Verify correct URLs and methods
3. Check for missing headers or body data

### **Step 4: Check Authentication**
1. Verify JWT tokens are stored and sent
2. Check token expiration
3. Ensure proper Authorization headers

### **Step 5: Check Error Handling**
1. Look for try/catch blocks
2. Verify error messages are displayed
3. Check console for error logs

---

## 🛠️ **Complete API Integration Template**

### **For Data Fetching Components**:
```javascript
"use client";

import { useState, useEffect } from "react";

export default function DataComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const token = localStorage.getItem('auth_token');
        const headers = {
          'Content-Type': 'application/json'
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch('/api/your-endpoint', {
          method: 'GET',
          headers
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error(result.error || 'API call failed');
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error.message);
        // Optional: fallback to static data
        // setData(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Render your data */}
    </div>
  );
}
```

### **For Data Submission Components**:
```javascript
const handleSubmit = async (formData) => {
  try {
    setIsSubmitting(true);
    setError(null);

    const token = localStorage.getItem('auth_token');
    const response = await fetch('/api/your-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      // Handle success
      alert('Success!');
      // Refresh data or redirect
    } else {
      throw new Error(result.error || 'Submission failed');
    }
  } catch (error) {
    console.error('Submission failed:', error);
    setError(error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 📊 **API Testing Checklist**

### **Before Deployment**:
- [ ] All API endpoints tested in Postman
- [ ] Authentication working correctly
- [ ] Error responses properly handled
- [ ] Loading states implemented
- [ ] Data validation on both frontend and backend
- [ ] CORS configured correctly
- [ ] Rate limiting implemented
- [ ] Input sanitization in place

### **Common API Endpoints to Test**:
- [ ] `GET /api/products` - List products
- [ ] `GET /api/products/[id]` - Single product
- [ ] `GET /api/categories` - List categories
- [ ] `POST /api/auth/login` - User login
- [ ] `POST /api/auth/register` - User registration
- [ ] `GET /api/auth/me` - Get user profile
- [ ] `GET /api/cart` - Get user cart
- [ ] `POST /api/cart` - Add to cart
- [ ] `PUT /api/cart/[id]` - Update cart item
- [ ] `DELETE /api/cart/[id]` - Remove from cart
- [ ] `GET /api/wishlist` - Get wishlist
- [ ] `POST /api/wishlist` - Add to wishlist
- [ ] `DELETE /api/wishlist/[id]` - Remove from wishlist

---

## 🎯 **Quick Fix Commands**

### **For Common Issues**:

**1. Missing API calls in frontend:**
```bash
# Search for static data usage
grep -r "import.*\.json" src/
grep -r "localStorage" src/
grep -r "useState.*\[\]" src/
```

**2. Check API endpoints exist:**
```bash
# List all API routes
find . -name "route.ts" -path "*/api/*"
```

**3. Test API endpoints:**
```bash
# Test with curl
curl -X GET http://localhost:3000/api/products
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

---

## 🔧 **Environment Setup Checklist**

### **Required Environment Variables**:
```env
# Database
DATABASE_URL="your_database_connection_string"


# Authentication
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="7d"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### **Required Dependencies**:
```json
{
  "dependencies": {
    "@prisma/client": "^6.17.1",
    "prisma": "^6.17.1",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^3.0.2",
    "zod": "^3.23.8"
  }
}
```

---

## 📝 **Documentation Template**

### **For Each API Endpoint**:
```markdown
## GET /api/endpoint
**Description**: Brief description of what this endpoint does
**Authentication**: Required/Optional
**Parameters**: Query parameters, if any
**Request Body**: JSON structure, if POST/PUT
**Response**: Expected response format
**Error Codes**: Possible error responses
**Example**: cURL command or Postman request
```

---

## 🚀 **Deployment Checklist**

### **Before Going Live**:
- [ ] All API endpoints tested in production environment
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] CORS settings updated for production domain
- [ ] Rate limiting configured
- [ ] Error monitoring set up
- [ ] API documentation updated
- [ ] Security headers configured
- [ ] SSL certificates installed
- [ ] Backup strategy implemented

---

## 💡 **Pro Tips**

1. **Always use try/catch** for API calls
2. **Implement loading states** for better UX
3. **Add error boundaries** for graceful error handling
4. **Use TypeScript** for better type safety
5. **Implement retry logic** for failed requests
6. **Cache API responses** when appropriate
7. **Use React Query/SWR** for advanced data fetching
8. **Implement optimistic updates** for better UX
9. **Add request/response logging** for debugging
10. **Use environment-specific API URLs**

---

## 🎯 **Summary**

This prompt covers the most common API integration issues and provides solutions for:
- Frontend not calling APIs
- Missing authentication
- Incorrect HTTP methods
- Poor error handling
- Missing loading states
- Environment setup
- Testing procedures
- Deployment preparation

Use this as a reference for any API integration project to ensure robust, reliable, and user-friendly applications.

**Remember**: The key to successful API integration is proper error handling, authentication, and user feedback! 🚀
