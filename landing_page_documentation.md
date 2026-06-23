# Bookly App Documentation: Landing Page & Authentication Flows

This document details the newly added main Landing Page at the root directory and the aligned professional forgot password/recovery flows.

---

## 1. Landing Page Flow & Components (`src/app/page.tsx`)

The main landing page at `/` is built using a clean React layout with interactive Tailwind CSS classes and custom states. The vertical flow is arranged as follows:

```
Top App Install Banner
   ↓
Navbar (Logo, Explore, How it works, Login, List Business, Language Selector)
   ↓
Hero Section (Headline & Description)
   ↓
Hero Search Bar (Search input, Location input, Time picker)
   ↓
Category Cards Row
   ↓
Recommended Cards Grid
```

### Banner & Header Layout Details
* **App Install Banner**: Toggled by `showBanner` state. Contains the `smallBLogo.svg` logo, platform compatibility SVGs for Apple/Android, an "Add to Home Screen" action button, and a close button that dismisses the banner.
* **Website Navbar**: Styled with a rounded border-radius container, dynamic backdrop blur, and low-opacity border. Includes redirects to:
  * **Login button**: Directs customers to `/customer` auth flow.
  * **List your business button**: Directs professionals to `/professional` signup/setup flow.
  * **Language Selector**: Toggled by `showLangDropdown` state. Supports selecting languages (English, Bengali, Greek, German).

### Hero Search Bar
* Includes input search query, location search, and an interactive **Clock Picker Dropdown** triggered by clicking the time option. Selecting a time updates the query and dismisses the time picker.

### Category Slider
* Supports active categories styling (switching background from white to black with light grey icon colors). Includes custom SVG paths mapping to the following categories:
  * All
  * Beauty & Wellness
  * Health Care
  * Sports & Activities
  * Experience & Tours
  * Entertainment & Events
  * Pets & Home (Femicons: using `/Icons/famicon.svg` asset)
  * Automotive

---

## 2. Aligned Professional Password Recovery Flow

The password recovery flow for professionals has been restructured under the `/professional/` directory to mirror the customer flow precisely.

### Router & Flow Summary:
```
/professional/password (Login page)
   ↓ (Clicking "Forgot your password?")
/professional/forgot-password (Enter email address)
   ↓ (Clicking "Next")
/professional/verify?flow=reset (Enter OTP verification code)
   ↓ (OTP Verified successfully)
/professional/new-password (Enter and confirm new password)
   ↓ (Successfully changed modal)
/professional/auth (Login Entry Screen)
```

### Key Files Created & Modified:
1. **Forgot Password Screen**: `src/app/professional/forgot-password/page.tsx`
   * Captures the user's email address and passes it to the verification route using the `flow=reset` query parameter.
2. **New Password Screen**: `src/app/professional/new-password/page.tsx`
   * Matches customer password reset fields (New Password / Confirm Password) with full form validations. Displays the "Successfully Changed" layout overlay when submitted.
3. **Password Entry Screen**: `src/app/professional/password/page.tsx`
   * Prompting the user to enter their account password with direct link redirections to the forgot password flow.
4. **Updated Verification Route**: `src/app/professional/verify/page.tsx`
   * Checks `flow === "reset"` to forward the user to `/professional/new-password` instead of the professional signup page.

---

## 3. How to Start/Build Locally

Ensure you bypass execution policies on Windows if script running is restricted on the system:

```powershell
# Bypassing execution policy to build production bundle
powershell -ExecutionPolicy Bypass -Command "npm run build"

# Running local dev server
npm run dev
```
