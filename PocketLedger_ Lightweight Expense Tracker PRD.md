# **PocketLedger: Lightweight Expense Tracker PRD**

## **1\. Overview**

**PocketLedger** is a simple, intuitive web-based expense tracker designed to help users manage personal finances with minimal effort. The app allows users to log, categorize, and visualize expenses, with a focus on lightweight performance, real-time updates, and ease of use. Built with SvelteKit and Supabase, it ensures a fast, secure, and scalable solution without unnecessary complexity.

---

## **2\. Objectives**

* Provide a straightforward tool for tracking personal expenses.  
* Ensure a lightweight, fast, and responsive user experience.  
* Avoid overengineering by focusing on core functionality: authentication, expense CRUD, basic visualization, and CSV export.  
* Deliver an MVP within 7-10 days that meets user needs with minimal dependencies.

---

## **3\. Target Audience**

* Individuals seeking a simple way to track daily expenses.  
* Users who prefer minimal setup and no steep learning curve.  
* Budget-conscious users who want a free, lightweight alternative to complex financial apps.

---

## **4\. Key Features**

### **4.1 Authentication**

* **Description**: Allow users to log in securely via email-based magic links (passwordless).  
* **Priority**: High  
* **Details**:  
  1. Use Supabase Auth for email-based OTP login.  
  2. No social logins or password-based auth to keep it simple.  
  3. Redirect to dashboard upon successful login.  
* **User Flow**:  
  1. User enters email on login page.  
  2. Receives magic link via email.  
  3. Clicks link to authenticate and access the app.

### **4.2 Expense Management (CRUD)**

* **Description**: Users can create, view, update, and delete expenses.  
* **Priority**: High  
* **Details**:  
  1. Form to add expenses with fields: amount (numeric), category (dropdown), description (optional text), and date (default to today).  
  2. Predefined categories: Food, Transport, Entertainment, Other.  
  3. Display expenses in a simple list with amount, category, date, and description.  
  4. Allow deletion of individual expenses; editing is optional to avoid complexity.  
* **User Flow**:  
  1. User navigates to expenses page.  
  2. Fills out form to add expense.  
  3. Views list of expenses, with option to delete entries.

### **4.3 Summary Dashboard**

* **Description**: Provide a high-level view of expenses by category.  
* **Priority**: Medium  
* **Details**:  
  1. Display total expenses per category (e.g., Food: $50, Transport: $30).  
  2. Use a simple stat card layout with DaisyUI for clean visuals.  
  3. No complex filtering or sorting in MVP to keep scope minimal.  
* **User Flow**:  
  1. User lands on dashboard after login.  
  2. Views total spending per category in stat cards.

### **4.4 Data Visualization**

* **Description**: Visualize expenses with a pie chart for category breakdown.  
* **Priority**: Medium  
* **Details**:  
  1. Use Visx for a lightweight pie chart showing category totals.  
  2. Avoid additional charts (e.g., time-series) in MVP to reduce complexity.  
  3. Use simple, distinct colors for each category.  
* **User Flow**:  
  1. User views pie chart on dashboard.  
  2. Chart updates automatically as expenses are added/deleted.

### **4.5 CSV Export**

* **Description**: Allow users to export expenses as a CSV file.  
* **Priority**: Low  
* **Details**:  
  1. Export all expenses with columns: Date, Category, Amount, Description.  
  2. Use native JavaScript Blob API to avoid external libraries.  
  3. Trigger download with a single button click.  
* **User Flow**:  
  1. User clicks "Export to CSV" button on expenses page.  
  2. Browser downloads `expenses.csv` file.

---

## **5\. Non-Functional Requirements**

* **Performance**: App should load in under 2 seconds on average connections (use SvelteKit SSR and Vercel hosting).  
* **Security**: Enable Supabase Row Level Security (RLS) to ensure users only access their own data.  
* **Usability**: Clean, responsive UI with Tailwind CSS and DaisyUI; mobile-friendly design.  
* **Scalability**: Supabase handles real-time updates and scales automatically.  
* **Bundle Size**: Keep client-side JavaScript minimal by using Visx and avoiding heavy libraries.

---

## **6\. Technical Stack**

* **Frontend**: SvelteKit (lightweight, fast SSR/SSG).  
* **Database**: Supabase (PostgreSQL with real-time capabilities).  
* **Charts**: Visx (modular, lightweight visualization).  
* **Auth**: Supabase Auth (email-based magic links).  
* **Styling**: Tailwind CSS \+ DaisyUI (prebuilt components for simplicity).  
* **Hosting**: Vercel (easy deployment, automatic scaling).  
* **Export**: Native JavaScript CSV export (no external libraries).

---

## **7\. Project Scope & Constraints**

### **In Scope (MVP)**

* Email-based authentication.  
* Basic expense CRUD (create, read, delete).  
* Simple dashboard with category totals.  
* Single pie chart for category visualization.  
* CSV export functionality.  
* Responsive design with Tailwind/DaisyUI.

### **Out of Scope (MVP)**

* Social logins or password-based auth.  
* Advanced filtering/sorting of expenses.  
* Time-series charts or complex visualizations.  
* Offline support or local storage.  
* Multi-currency support.  
* Budgeting or forecasting features.

---

## **8\. Development Timeline**

* **Phase 1: Setup & Core Architecture** (1-2 days)  
  * Initialize SvelteKit project, configure Supabase, set up Tailwind/DaisyUI.  
  * Create database schema for expenses.  
* **Phase 2: Core Features** (3-4 days)  
  * Implement authentication (login page with Supabase Auth).  
  * Build expense CRUD (form and list).  
  * Create summary dashboard with stat cards.  
* **Phase 3: Data Visualization** (1-2 days)  
  * Add Visx pie chart for category totals.  
* **Phase 4: Export & Polish** (1 day)  
  * Implement CSV export.  
  * Add responsive design, loading states, and basic error handling.  
  * Deploy to Vercel.

**Total Estimated Time**: 6-9 days

---

## **9\. Success Metrics**

* **User Engagement**: Users can add at least one expense within 1 minute of first login.  
* **Performance**: Page load time \< 2 seconds on 4G networks.  
* **Reliability**: 99% uptime via Vercel and Supabase.  
* **Adoption**: 100% of test users can log in, add expenses, and export CSV without errors.

---

## **10\. Risks & Mitigations**

* **Risk**: Supabase setup errors (e.g., RLS misconfiguration).  
  * **Mitigation**: Follow Supabase documentation; test RLS policies thoroughly.  
* **Risk**: Visx learning curve for pie chart implementation.  
  * **Mitigation**: Use simple Visx examples; fall back to static stat cards if needed.  
* **Risk**: Scope creep with additional features (e.g., filters, multi-currency).  
  * **Mitigation**: Strictly adhere to MVP scope; defer non-essential features to future iterations.

---

## **11\. Future Enhancements (Post-MVP)**

* Add expense editing functionality.  
* Support time-series charts for spending trends.  
* Implement basic budgeting features (e.g., set category limits).  
* Add offline support via SvelteKit service workers.  
* Allow users to customize categories.

---

## **12\. Project Structure**

src/  
├── lib/  
│   ├── supabaseClient.js      \# Supabase client setup  
│   └── chartUtils.js          \# Visx utility functions  
├── routes/  
│   ├── (auth)/  
│   │   ├── login/+page.svelte \# Login page  
│   │   └── callback/+page.svelte \# Auth callback  
│   ├── dashboard/+page.svelte  \# Summary dashboard  
│   ├── expenses/+page.svelte   \# Expense CRUD  
│   └── \+layout.svelte         \# Global layout  
└── app.css                    \# Tailwind/DaisyUI styles

---

## **13\. Deployment**

* **Platform**: Vercel for hosting SvelteKit app.  
* **Environment Variables**:  
  1. `VITE_SUPABASE_URL`: Supabase project URL.  
  2. `VITE_SUPABASE_KEY`: Supabase public key.  
* **Steps**:  
  1. Push code to GitHub.  
  2. Connect repository to Vercel.  
  3. Add environment variables in Vercel dashboard.  
  4. Deploy with `vercel deploy`.

---

## **14\. Assumptions**

* Users have access to email for authentication.  
* Basic internet connectivity (4G or better) is available.  
* Supabase free tier is sufficient for MVP scale.  
* Users are comfortable with simple web interfaces.

---

## **15\. Conclusion**

PocketLedger is designed to be a minimal, functional expense tracker that prioritizes simplicity and speed. By leveraging SvelteKit, Supabase, and Visx, the app delivers core features without unnecessary complexity, ensuring a delightful user experience within a tight development timeline.

