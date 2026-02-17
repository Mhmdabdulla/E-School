#  E-School Backend: Enterprise-Grade LMS Architecture

### **The Engineering Mission**
Building a scalable, media-heavy learning platform requires more than just API endpoints. This backend was designed with **Clean Architecture** and **SOLID principles** to ensure the code remains maintainable as the business scales.

I chose **InversifyJS** to implement **Dependency Injection**, creating a decoupled system where business logic, data access, and external services (Stripe, S3) are strictly separated.



---

### **🏗️ Core Architectural Pillars**

- **Scalable Architecture:** Built with **TypeScript** and **Express 5.0**, utilizing a **Service-Repository pattern** to keep controllers lean and business logic reusable.
- **Dependency Injection:** Powered by **Inversify** and **reflect-metadata** for professional-grade IoC (Inversion of Control), facilitating easier unit testing and modularity.
- **Media Processing Engine:** Integrated **fluent-ffmpeg** and **ffprobe** to handle automated video/audio processing for course content.
- **Type-Safe Validation:** Full use of **class-validator** and **class-transformer** to ensure data integrity before it ever touches the database.

---

### **🔄 System Workflows & Enterprise Logic**
The platform manages a complex multi-user ecosystem (Student, Instructor, Admin) with state-dependent transitions:

- **Student Lifecycle:** Managed a seamless flow from Secure Registration (JWT/OAuth2) to Stripe-powered Course Enrollment. I implemented a **Progress Tracking Engine** that monitors video timestamps to gate-keep the Automated Certificate Generation (PDFKit).
- **Instructor Operations:** Built a robust **Instructor Onboarding Pipeline**. Approved instructors gain access to a Course Management Dashboard featuring secure file uploads to **AWS S3** and a Financial Ledger to track earnings and initiate Payout Requests.
- **Administrative Oversight:** Created a centralized **Admin Command Center** to moderate content, review instructor applications, and process financial payouts, ensuring platform-wide data integrity and security.
- **Real-time Communication:** Leveraged **Socket.io** for direct, low-latency chat between students and instructors.



---

### **🛠️ Professional-Grade Tech Stack**

| Category | Tools & Technologies |
| :--- | :--- |
| **Language & Core** | TypeScript (Strict), Node.js, Express 5.0 |
| **Database** | MongoDB (via Mongoose), Redis (via ioredis) |
| **Cloud & Storage** | AWS S3 (SDK v3) with Presigned URLs |
| **Financials** | Stripe Integration for secure subscriptions |
| **Real-time** | Socket.io for live notifications and chat |
| **Security** | Passport.js (Google OAuth 2.0), JWT, BcryptJS |
| **Utilities** | PDFKit, Nodemailer, Winston Logging |

---

### **🌟 Key Industrial Implementations**

- **Complex Media Workflows:** Managed large file uploads using Multer and stored them in **AWS S3**, utilizing Presigned URLs to ensure content security.
- **State Machine Logic:** Implemented specific logic for course progress; users cannot download certificates until the **Progress Tracker** hits 100%.
- **Enterprise Security:** Implemented a dual-layered Auth system (OAuth2.0 + JWT) and handled cross-origin security via custom middleware.
- **Resilient Operations:** Configured **Winston** for structured logging and utilized **PM2** for process management in production.

---

### **🚀 How to Setup**

1. **Environment:** Clone the repo and create a `.env` file based on the provided configuration.
2. **Install Dependencies:** ```bash
   npm install
3. **Development Mode:** npm run dev
4. Production Build:** npm run build   npm start
