import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        welcome: "Welcome",
        login: "Login",
        signup: "Sign Up",
        logout: "Logout",
        dashboard: "Dashboard",
        profile: "Profile",
        jobs: "Jobs",
        messages: "Messages",
        wallet: "Wallet",
        settings: "Settings",
        search: "Search",
        apply: "Apply",
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        loading: "Loading...",
        submit: "Submit",
        manageJobs: "Manage Jobs",
postNewJob: "Post New Job",
verification: "Verification"
      },
      login: {
        title: "Welcome to DailyWage",
        subtitle: "Select your role to continue",
        employee: "EMPLOYEE",
        employer: "EMPLOYER",
        employeeDesc: "Find jobs, manage applications & grow your career",
        employerDesc: "Post work requests & hire skilled workers"
      },
      dashboard: {
        employeeTitle: "EMPLOYEE'S DASHBOARD",
        employerTitle: "EMPLOYER'S DASHBOARD",
        profileManagement: "PROFILE MANAGEMENT",
        profileDesc: "Manage your profile for verification and to market your skills",
        requestsHires: "REQUESTS AND HIRES",
        requestsDesc: "Job Alert! New opportunities in your area!",
        inbox: "INBOX",
        inboxDesc: "Get direct with your employer!",
        wallet: "WALLET",
        walletDesc: "We keep your money safe!"
      },
      jobs: {
        title: "JOB OPPORTUNITIES",
        browseJobs: "Browse Jobs",
        myApplications: "My Applications",
        postNewJob: "Post New Job",
        searchPlaceholder: "Search jobs...",
        applyNow: "Apply Now",
        applications: "Applications"
      },
      verification: {
        title: "IDENTITY VERIFICATION",
        uploadID: "Upload ID Proof",
        takeSelfie: "Take Live Selfie",
        verifyIdentity: "Verify Identity"
      }
    }
  },
  kn: {
    translation: {
      common: {
        welcome: "ಸ್ವಾಗತ",
        login: "ಲಾಗಿನ್",
        signup: "ಸೈನ್ ಅಪ್",
        logout: "ಲಾಗ್ ಔಟ್",
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        profile: "ಪ್ರೊಫೈಲ್",
        jobs: "ಉದ್ಯೋಗಗಳು",
        messages: "ಸಂದೇಶಗಳು",
        wallet: "ವಾಲೆಟ್",
        settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
        search: "ಹುಡುಕಿ",
        apply: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
        save: "ಉಳಿಸಿ",
        cancel: "ರದ್ದುಮಾಡಿ",
        edit: "ಸಂಪಾದಿಸಿ",
        delete: "ಅಳಿಸಿ",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        submit: "ಸಲ್ಲಿಸಿ",
        manageJobs: "ಕೆಲಸಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
        postNewJob: "ಹೊಸ ಕೆಲಸವನ್ನು ಪ್ರಕಟಿಸಿ",
  verification: "ಪರಿಶೀಲನೆ"
      },
      login: {
        title: "DailyWage ಗೆ ಸ್ವಾಗತ",
        subtitle: "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        employee: "ನೌಕರ",
        employer: "ಉದ್ಯೋಗದಾತ",
        employeeDesc: "ಉದ್ಯೋಗಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಅರ್ಜಿಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
        employerDesc: "ಕೆಲಸದ ವಿನಂತಿಗಳನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ"
      },
      dashboard: {
        employeeTitle: "ನೌಕರರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        employerTitle: "ಉದ್ಯೋಗದಾತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        profileManagement: "ಪ್ರೊಫೈಲ್ ನಿರ್ವಹಣೆ",
        profileDesc: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಅನ್ನು ನಿರ್ವಹಿಸಿ",
        requestsHires: "ವಿನಂತಿಗಳು ಮತ್ತು ನೇಮಕಾತಿಗಳು",
        requestsDesc: "ಹೊಸ ಅವಕಾಶಗಳು!",
        inbox: "ಇನ್‌ಬಾಕ್ಸ್",
        inboxDesc: "ನಿಮ್ಮ ಉದ್ಯೋಗದಾತರೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸಿ!",
        wallet: "ವಾಲೆಟ್",
        walletDesc: "ನಿಮ್ಮ ಹಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸುತ್ತೇವೆ!"
      },
      jobs: {
        title: "ಉದ್ಯೋಗ ಅವಕಾಶಗಳು",
        browseJobs: "ಉದ್ಯೋಗಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
        myApplications: "ನನ್ನ ಅರ್ಜಿಗಳು",
        postNewJob: "ಹೊಸ ಉದ್ಯೋಗವನ್ನು ಪೋಸ್ಟ್ ಮಾಡಿ",
        searchPlaceholder: "ಉದ್ಯೋಗಗಳನ್ನು ಹುಡುಕಿ...",
        applyNow: "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
        applications: "ಅರ್ಜಿಗಳು"
      },
      verification: {
        title: "ಗುರುತಿನ ಪರಿಶೀಲನೆ",
        uploadID: "ID ಪುರಾವೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        takeSelfie: "ಲೈವ್ ಸೆಲ್ಫಿ ತೆಗೆಯಿರಿ",
        verifyIdentity: "ಗುರುತನ್ನು ಪರಿಶೀಲಿಸಿ"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;