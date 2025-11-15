# Form Builder Authentication Setup

## Quick Setup

The form builder at `/forms` is now protected with password authentication.

### 1. Set Your Admin Password

**CRITICAL:** You must create a `.env.local` file in the root directory of your project (same level as `package.json`).

Create the file with this exact content (no spaces around the `=` sign):

```bash
ADMIN_PASSWORD=your-secure-password-here
```

**Important:** 
- File must be named `.env.local` (not `.env` or `.env.local.txt`)
- Must be in the root directory (same folder as `package.json`)
- No spaces around the `=` sign
- Use a strong password
- Never commit `.env.local` to git (it's already in `.gitignore`)
- **YOU MUST RESTART YOUR DEV SERVER** after creating/updating the file

### 2. How It Works

- **Login Page**: `/forms/login` - Enter your admin password
- **Form Builder**: `/forms` - Protected, requires authentication
- **Session**: Cookie-based, expires after 7 days
- **Logout**: Click the logout button in the form builder header

### 3. Access Flow

1. Navigate to `/forms` → Automatically redirected to `/forms/login` if not authenticated
2. Enter your admin password
3. Access granted to form builder
4. Session persists for 7 days (or until logout)

### 4. Security Features

- ✅ HTTP-only cookies (prevents XSS attacks)
- ✅ Secure cookies in production (HTTPS only)
- ✅ Server-side password validation
- ✅ Automatic session expiration

### 5. Changing the Password

Update the `ADMIN_PASSWORD` environment variable and restart your Next.js server:

```bash
# Development
pnpm dev

# Production
pnpm build && pnpm start
```

### 6. Multiple Admins

Currently supports a single password. For multiple admins, consider:
- Using a password manager to share the password securely
- Upgrading to a more robust auth system (NextAuth.js, etc.)

---

**Default Password:** `admin123` (change this immediately!)

