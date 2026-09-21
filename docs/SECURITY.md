# OushodBox Security Specification

This document details the security architecture, authorization mechanisms, rules implementation, and threat model for OushodBox.

---

## 1. Designated Administrator Account

OushodBox operates as a private, single-admin application designated for:
```
mehj49966@gmail.com
```

### Configuration & Rotation
- **Client Application**: The email is declared via the environment variable `NEXT_PUBLIC_ADMIN_EMAIL` (defaulting to `mehj49966@gmail.com`) and centralized in `src/lib/auth/admin.ts`.
- **Firestore Rules**: Firestore rules do not have access to client environment variables. Consequently, the administrator email is defined directly in `firestore.rules` inside the `adminEmail()` helper function.
- **Rotating the Admin Email**:
  1. Update `NEXT_PUBLIC_ADMIN_EMAIL` in your environment (e.g., Vercel / `.env.local`).
  2. Update `adminEmail()` in `firestore.rules`:
     ```rules
     function adminEmail() {
       return "new-admin@example.com";
     }
     ```
  3. Deploy the updated rules:
     ```bash
     firebase deploy --only firestore:rules
     ```
  4. Deploy the frontend application.

---

## 2. Firestore Security Rules Analysis

File: `firestore.rules`

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Admin email constant
    function adminEmail() {
      return "mehj49966@gmail.com";
    }

    // Auth verification helper
    function isAdmin() {
      return request.auth != null && request.auth.token.email == adminEmail();
    }

    // Medicines collection: strictly private, admin-only read & write
    match /medicines/{medicineId} {
      allow read, create, update, delete: if isAdmin();

      // Price history subcollection: append-only and immutable
      match /priceHistory/{entryId} {
        allow read, create: if isAdmin();
        allow update, delete: if false;
      }
    }

    // Default deny rule
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Rule-by-Rule Breakdown:
- `isAdmin()`: Validates that the user has a valid Firebase Authentication token AND their verified token email matches the designated admin email.
- `/medicines/{medicineId}`: Both read and write (create, update, delete) are locked exclusively to `isAdmin()`. Signed-out or unauthorized users cannot read or write documents.
- `/medicines/{medicineId}/priceHistory/{entryId}`:
  - `allow read, create: if isAdmin()`: Only the admin can view or append price history entries.
  - `allow update, delete: if false`: History records are immutable; once created, no one (not even the admin) can modify or delete historic price points.
- `match /{document=**}`: Default deny-all catch-all protecting any other collections or accidental document paths.

---

## 3. Threat Model & Risk Analysis

### Attack Vector: Public Extraction of Firebase Config
- **Scenario**: An adversary extracts the API keys, project ID, and storage bucket from client JavaScript.
- **Impact**: Zero impact on database confidentiality or integrity. Firebase Web API keys are identifiers, not secrets. All operations against Cloud Firestore are mediated by Cloud Security Rules. Since `read` is gated by `isAdmin()`, an unauthenticated caller or an attacker with another Google account receives `permission-denied` for all queries.

### Attack Vector: Non-Admin Google Sign-in
- **Scenario**: An arbitrary user authenticates with their personal Google account via Firebase Auth.
- **Impact**: Blocked at two layers:
  1. *Firestore Rules Level*: `request.auth.token.email == adminEmail()` evaluates to `false`. Every query or mutation fails with permission denied.
  2. *Client Guard Level*: `AdminAuthGuard` and login handlers detect that `user.email !== ADMIN_EMAIL`, instantly execute `logout()`, wipe IndexedDB cache, and redirect to `/admin/login?error=unauthorized`.

### Attack Vector: Stale Browser / IndexedDB Cache
- **Scenario**: The administrator signs out on a shared machine, or a signed-out user inspects local IndexedDB.
- **Mitigation**:
  - `logout()` in `src/lib/auth.ts` calls `clearMedicines()` to wipe all local cache records.
  - The client UI components (`MedicineDetailContainer`, `HomePage`, `MedicineDatabasePage`) verify `isAuthorizedAdmin` before reading from IndexedDB. Signed-out users are never served cached medicine data.

---

## 4. Known Architectural Considerations
- **No Server-Side Session Cookies**: The application relies on the standard Firebase Client SDK (`onAuthStateChanged` / client tokens). Server components do not read session cookies.
- **Decrypted Client Storage**: Offline cache in IndexedDB is unencrypted on disk (standard web behavior). Sensitive devices should use OS-level user account separation.
