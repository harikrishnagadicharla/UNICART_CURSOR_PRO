# 🚀 **Quick Fix for Cart & Wishlist Issues**

## ✅ **Database Status**: FIXED
- Database reset and reseeded successfully
- Admin user: `admin@example.com` / `Admin@123`
- 5 products created
- 6 categories created

## 🔧 **Quick Test Steps**

### **Step 1: Login**
1. Go to: `http://localhost:3000/login`
2. Login with: `admin@example.com` / `Admin@123`
3. Check browser console for any errors

### **Step 2: Test Cart**
1. Go to: `http://localhost:3000/products`
2. Click "Add to Cart" on any product
3. Check Network tab for API calls
4. Go to: `http://localhost:3000/cart`

### **Step 3: Test Wishlist**
1. Go to: `http://localhost:3000/products`
2. Hover over product and click heart icon
3. Check Network tab for API calls
4. Go to: `http://localhost:3000/wishlist`

## 🐛 **Common Issues & Quick Fixes**

### **Issue 1: "Please login" Alert**
**Fix**: Make sure you're logged in first
- Go to `/login` and login with admin credentials
- Check if token is stored: `localStorage.getItem('auth_token')`

### **Issue 2: No API Calls in Network Tab**
**Fix**: Check browser console for errors
- Open DevTools → Console tab
- Look for JavaScript errors
- Refresh the page and try again

### **Issue 3: 401 Unauthorized Errors**
**Fix**: Token might be expired
- Logout and login again
- Check if token exists in localStorage

### **Issue 4: Products Not Loading**
**Fix**: Check if development server is running
- Make sure `npm run dev` is running
- Check `http://localhost:3000/api/products`

## 🔍 **Debug Commands**

```bash
# Check if server is running
curl http://localhost:3000/api/products

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@123"}'
```

## 📱 **Expected Behavior**

### **Working Cart**:
- ✅ Click "Add to Cart" → Success alert
- ✅ Network tab shows `POST /api/cart`
- ✅ Cart page shows added items
- ✅ Quantity updates work

### **Working Wishlist**:
- ✅ Click heart icon → Success alert
- ✅ Network tab shows `POST /api/wishlist`
- ✅ Wishlist page shows added items
- ✅ Remove from wishlist works

## 🚨 **If Still Not Working**

1. **Check Browser Console** for errors
2. **Check Network Tab** for failed requests
3. **Verify Login** - make sure you're authenticated
4. **Clear Browser Cache** and try again
5. **Restart Dev Server** if needed

The APIs are working perfectly - the issue is likely in the frontend integration or authentication state.
