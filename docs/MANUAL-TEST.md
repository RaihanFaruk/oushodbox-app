# OushodBox Post-Deployment Verification Checklist

Run through this manual verification checklist in an incognito or clean browser window after each deployment or Firestore rules change.

---

## 1. Unauthenticated & Access Control Tests

- [ ] **Home Route (`/`) while signed out:**
  - Navigate to `/` in incognito.
  - Expected: Clean private workspace banner ("ব্যক্তিগত মেডিসিন ও মূল্য রেফারেন্স") with an "অ্যাডমিন লগইন" button.
  - Zero medicine records or cached prices shown.
  - No console Firestore permission errors.

- [ ] **Medicines Database (`/medicines`) while signed out:**
  - Navigate to `/medicines`.
  - Expected: Private medicine database screen ("প্রাইভেট মেডিসিন ডেটাবেস") with an "অ্যাডমিন লগইন" button.
  - Zero medicine records shown.

- [ ] **Medicine Detail (`/medicines/[id]`) while signed out:**
  - Navigate to `/medicines/any-id-here`.
  - Expected: Private medicine detail screen ("ব্যক্তিগত ওষুধ বিবরণ") with a login button.
  - No cached monograph or pricing data leaked.

- [ ] **Admin Console (`/admin`) while signed out:**
  - Navigate to `/admin`.
  - Expected: Immediate client-side redirection to `/admin/login`.

---

## 2. Authentication Flow Tests

- [ ] **Admin Login via Google:**
  - On `/admin/login`, click "Google দিয়ে সাইন ইন" using `mehj49966@gmail.com`.
  - Expected: Successful login and redirect to `/admin` dashboard showing administrator identity.

- [ ] **Admin Login via Email/Password:**
  - On `/admin/login`, enter `mehj49966@gmail.com` and password, then submit.
  - Expected: Successful authentication and redirect to `/admin`.

- [ ] **Non-Admin Account Rejection:**
  - Sign out, then attempt to sign in with any Google account other than `mehj49966@gmail.com`.
  - Expected: Immediate rejection, automatic sign-out, redirection back to `/admin/login?error=unauthorized` showing:
    > "এই গুগল অ্যাকাউন্টটি অনুমোদিত নয়। শুধুমাত্র নির্ধারিত অ্যাডমিন অ্যাকাউন্ট প্রবেশ করতে পারবে।"

---

## 3. Data Integrity & Price History Tests

- [ ] **Add Medicine (Creation & Initial Price History):**
  - While logged in as admin on `/admin`, click "নতুন ওষুধ যুক্ত করুন" and create a medicine (e.g., Trade: "Napa Extra", Price: 3.50).
  - Expected:
    1. Medicine appears in the admin table.
    2. In Firebase Console, check `medicines/{id}` document created.
    3. Check `medicines/{id}/priceHistory` subcollection contains 1 initial entry with `price: 3.5`, `currency: "BDT"`, `changedBy: "mehj49966@gmail.com"`, `note: "Initial price"`.

- [ ] **Update Medicine Price (New History Entry):**
  - Edit the newly created medicine and change price from 3.50 to 4.00.
  - Expected:
    1. Success toast displayed.
    2. In Firebase Console, `medicines/{id}/priceHistory` now has 2 entries.
    3. In detail view (`/medicines/{id}`), the "দামের ইতিহাস" section appears showing both entries with `+৳০.৫০ (↑)` change badge.

- [ ] **Update Non-Price Field (No Duplicate History Entry):**
  - Edit the medicine to change the note or generic name without modifying price.
  - Expected:
    1. Document updates in Firestore.
    2. `medicines/{id}/priceHistory` still has only 2 entries (no spurious history document created).

- [ ] **Delete Medicine:**
  - Click delete on the medicine in the admin panel and confirm.
  - Expected: Record removed from UI and Firestore document deleted.

---

## 4. Offline & PWA Tests

- [ ] **Offline Cache Access (Authenticated Admin):**
  - While logged in, view `/medicines`.
  - Open DevTools > Network tab > set to "Offline".
  - Refresh or navigate to `/medicines`.
  - Expected: Medicines load from IndexedDB cache with "অফলাইন ক্যাশ" or offline toast indicator.

- [ ] **Offline Write Safeguard:**
  - While still offline, attempt to add or update a medicine.
  - Expected: UI catches the connection error and displays a clear Bangla toast message without crashing.

- [ ] **Cache Flush on Logout:**
  - Restore network connection, then click "লগআউট".
  - Inspect DevTools > Application > Storage > IndexedDB (`oushodbox-offline-db`).
  - Expected: The medicine cache is completely empty.

---

## 5. Sharing & Clinical Safety Tests

- [ ] **WhatsApp 1-Tap Share:**
  - On `/` or `/medicines`, click the WhatsApp share icon on any medicine card.
  - Expected: Toast confirms copy to clipboard or opens WhatsApp with formatted Bengali text containing Trade name, Generic, Company, and Reference price.

- [ ] **Clinical Safety Guard Verification:**
  - View any custom-added medicine without clinical guide data on `/medicines/[id]`.
  - Expected: Clinical tabs render `"Clinical information is not available yet."` instead of fabricating medical facts or contraindications.
