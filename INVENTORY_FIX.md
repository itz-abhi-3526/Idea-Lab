## Setup Instructions for Inventory Fix

The inventory page had "failed to fetch" errors after migration from Next.js to Node.js.

### Changes Made:

1. **Environment Configuration** (.env.local):
   - Added `VITE_API_BASE_URL=http://localhost:10000` for client-side API calls
   - Ensured Supabase credentials are present for both client and server

2. **Client-side Fixes**:
   - **src/pages/inventory/page.tsx**: Simplified fetch logic to use VITE_API_BASE_URL properly
   - **src/pages/dashboard/inventory-requests/page.tsx**: Added missing `email` field to API request payload

3. **Server-side Fixes**:
   - **server/routes/inventory.ts**: Added missing admin endpoints:
     - POST `/api/admin/inventory-requests/approve`
     - POST `/api/admin/inventory-requests/reject`
     - POST `/api/admin/inventory-requests/complete`

### How It Works:

**Development Mode:**
- Client (Vite) runs on port 5173
- Vite proxy (configured in vite.config.ts) forwards `/api/*` requests to `http://localhost:10000`
- Server (Node.js) runs on port 10000
- All inventory requests flow: Client → Vite Proxy → Server → Supabase

**Production Mode:**
- Set `VITE_API_BASE_URL` environment variable on Vercel frontend deployment
- Backend should be running on Render or similar platform
- Update `VITE_API_BASE_URL` to point to your backend domain

### Running:

```bash
# Install dependencies
npm install

# Development (starts both client and server)
npm run dev

# Or run server and client separately:
npm run server    # Terminal 1: Server on port 10000
npm run build     # Terminal 2: Build client
npm run dev       # Terminal 2 (after build, in another terminal)
```

### Testing:

1. Go to http://localhost:5173/inventory
2. Login with your account
3. Add items to cart
4. Fill in requester details
5. Submit request

The request should now be successfully saved to Supabase!

### Troubleshooting:

- Check browser DevTools Console for fetch URLs
- Verify server is running and accessible
- Check Supabase credentials in .env.local
- Ensure server is listening on port 10000
