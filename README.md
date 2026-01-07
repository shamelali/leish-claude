\# Leish Studio - Professional Studio Booking



Modern, production-ready booking platform for creative studios.



\## 🚀 Quick Deploy to Vercel



\### Option 1: One-Click Deploy (Recommended)

```bash

\# Install Vercel CLI

npm i -g vercel



\# Deploy

vercel --prod

```



\### Option 2: Git Integration

1\. Push code to GitHub

2\. Go to \[vercel.com](https://vercel.com)

3\. Import repository

4\. Click "Deploy"



\## 📁 Project Structure



```

leish-studio/

├── index.html          # Main application (standalone)

├── vercel.json         # Vercel configuration

├── .gitignore          # Git ignore rules

└── README.md           # This file

```



\## ✅ Pre-Deployment Checklist



\- \[x] HTML merge conflicts fixed

\- \[x] Admin credentials removed from frontend

\- \[x] Security headers configured

\- \[x] Mobile responsive

\- \[ ] Firebase credentials configured (do after deployment)

\- \[ ] Custom domain setup (optional)



\## 🔐 Security Setup (IMPORTANT)



\### After Deployment:



1\. \*\*Set up Firebase Authentication:\*\*

&nbsp;  ```bash

&nbsp;  npm install firebase

&nbsp;  ```



2\. \*\*Create `.env.local` file:\*\*

&nbsp;  ```env

&nbsp;  VITE\_FIREBASE\_API\_KEY=your\_api\_key

&nbsp;  VITE\_FIREBASE\_AUTH\_DOMAIN=your\_auth\_domain

&nbsp;  VITE\_FIREBASE\_PROJECT\_ID=your\_project\_id

&nbsp;  ```



3\. \*\*Add environment variables in Vercel:\*\*

&nbsp;  - Go to Project Settings → Environment Variables

&nbsp;  - Add all Firebase credentials

&nbsp;  - Redeploy



4\. \*\*Configure Firebase Admin:\*\*

&nbsp;  - Never store admin credentials in frontend

&nbsp;  - Use Firebase Admin SDK with service accounts

&nbsp;  - Implement Cloud Functions for admin operations



\### Security Best Practices:



```javascript

// ✅ GOOD: Environment variables

const firebaseConfig = {

&nbsp; apiKey: process.env.VITE\_FIREBASE\_API\_KEY,

&nbsp; authDomain: process.env.VITE\_FIREBASE\_AUTH\_DOMAIN,

&nbsp; projectId: process.env.VITE\_FIREBASE\_PROJECT\_ID

};



// ❌ BAD: Hardcoded credentials

const adminPassword = "admin123"; // Never do this!

```



\## 🔧 Configuration



\### Admin Authentication (Secure Method)



1\. \*\*Create Firebase Cloud Function:\*\*

&nbsp;  ```javascript

&nbsp;  // functions/index.js

&nbsp;  const functions = require('firebase-functions');

&nbsp;  const admin = require('firebase-admin');

&nbsp;  

&nbsp;  admin.initializeApp();

&nbsp;  

&nbsp;  exports.checkAdmin = functions.https.onCall(async (data, context) => {

&nbsp;    const uid = context.auth.uid;

&nbsp;    const user = await admin.auth().getUser(uid);

&nbsp;    

&nbsp;    // Check custom claims

&nbsp;    return { isAdmin: user.customClaims?.admin === true };

&nbsp;  });

&nbsp;  ```



2\. \*\*Set admin claim:\*\*

&nbsp;  ```bash

&nbsp;  firebase functions:shell

&nbsp;  admin.auth().setCustomUserClaims('user-uid', { admin: true })

&nbsp;  ```



\## 📱 Features



\- ✨ Modern dark theme UI

\- 🔐 Social authentication (Google, Apple)

\- 📧 Email/password authentication

\- 👤 User profile management

\- 📅 Studio booking system

\- 🔔 Notification system

\- 📊 Admin dashboard

\- 📱 Fully responsive



\## 🛠 Tech Stack



\- \*\*Frontend:\*\* Pure HTML/CSS/JavaScript

\- \*\*Styling:\*\* Tailwind CSS + Custom CSS

\- \*\*Icons:\*\* Font Awesome

\- \*\*Fonts:\*\* Google Fonts (Outfit)

\- \*\*Hosting:\*\* Vercel

\- \*\*Backend (to add):\*\* Firebase



\## 🔄 Adding Firebase



\### 1. Install Firebase:

```bash

npm install firebase

```



\### 2. Initialize Firebase:

```javascript

// Add before closing </body> tag in index.html

import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';



const firebaseConfig = {

&nbsp; apiKey: "YOUR\_API\_KEY",

&nbsp; authDomain: "YOUR\_AUTH\_DOMAIN",

&nbsp; projectId: "YOUR\_PROJECT\_ID",

&nbsp; storageBucket: "YOUR\_STORAGE\_BUCKET",

&nbsp; messagingSenderId: "YOUR\_MESSAGING\_SENDER\_ID",

&nbsp; appId: "YOUR\_APP\_ID"

};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

```



\### 3. Replace placeholder auth functions:

```javascript

// Replace handleAuth() function

async function handleAuth(event) {

&nbsp; event.preventDefault();

&nbsp; const email = document.getElementById('emailInput').value;

&nbsp; const password = document.getElementById('passwordInput').value;



&nbsp; try {

&nbsp;   if (authMode === 'login') {

&nbsp;     await signInWithEmailAndPassword(auth, email, password);

&nbsp;   } else {

&nbsp;     await createUserWithEmailAndPassword(auth, email, password);

&nbsp;   }

&nbsp;   showToast('Success!', 'success');

&nbsp; } catch (error) {

&nbsp;   showToast(error.message, 'error');

&nbsp; }

}

```



\## 🌐 Custom Domain



1\. Go to Vercel Project Settings

2\. Click "Domains"

3\. Add your custom domain

4\. Update DNS records as instructed



\## 📊 Analytics (Optional)



Add Google Analytics:

```html

<!-- Add before </head> -->

<script async src="https://www.googletagmanager.com/gtag/js?id=GA\_MEASUREMENT\_ID"></script>

<script>

&nbsp; window.dataLayer = window.dataLayer || \[];

&nbsp; function gtag(){dataLayer.push(arguments);}

&nbsp; gtag('js', new Date());

&nbsp; gtag('config', 'GA\_MEASUREMENT\_ID');

</script>

```



\## 🐛 Troubleshooting



\### Site not loading?

\- Check browser console for errors

\- Verify all CDN links are accessible

\- Clear browser cache



\### Authentication not working?

\- Confirm Firebase is initialized

\- Check Firebase console for project settings

\- Verify environment variables in Vercel



\### Admin login fails?

\- Ensure Firebase Admin SDK is configured

\- Verify custom claims are set correctly

\- Check Cloud Functions logs



\## 📝 TODO After Deployment



1\. \[ ] Add Firebase credentials

2\. \[ ] Test authentication flows

3\. \[ ] Configure admin accounts

4\. \[ ] Set up email notifications

5\. \[ ] Add booking calendar integration

6\. \[ ] Configure payment processing (Stripe)

7\. \[ ] Set up automated email/SMS reminders

8\. \[ ] Add analytics tracking

9\. \[ ] Create booking confirmation emails

10\. \[ ] Test on mobile devices



\## 🤝 Support



For issues or questions:

\- 📧 Email: hello@leishstudio.com

\- 📱 Phone: +60 12-345 6789



\## 📄 License



Private - All rights reserved



---



\*\*Deployed with ❤️ on Vercel\*\*

