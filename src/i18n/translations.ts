
export type Language = 'en' | 'hi' | 'ta';

export const translations = {
  en: {
    common: {
      appName: 'Loan Compass',
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      cancel: 'Cancel',
      submit: 'Submit',
      next: 'Next',
      continue: 'Continue',
      back: 'Back',
      save: 'Save',
      search: 'Search',
      success: 'Success',
      failure: 'Failure',
      home: 'Home',
      profile: 'Profile',
      history: 'History',
      language: 'Language',
      logout: 'Logout',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      phoneNumber: 'Phone Number',
      enterPhone: 'Enter your phone number',
      otpSent: 'We have sent an OTP to your phone',
      enterOTP: 'Enter the 4-digit code',
      verifyOTP: 'Verify OTP',
      resendOTP: 'Resend OTP',
      loginSuccess: 'Login successful',
      invalidOTP: 'Invalid OTP. Please try again.',
      welcomeBack: 'Welcome back!',
      newUser: 'New user? Register here',
      existingUser: 'Existing user? Login here',
    },
    dashboard: {
      welcome: 'Welcome',
      trustScore: 'Trust Score',
      availableLoan: 'Available Loan Amount',
      requestLoan: 'Request Loan',
      viewHistory: 'View History',
      trustProfile: 'Trust Profile',
      myBadges: 'My Badges',
    },
    loan: {
      requestTitle: 'Request a Loan',
      amount: 'Amount',
      purpose: 'Purpose',
      purposePlaceholder: 'What do you need the loan for?',
      submit: 'Submit Request',
      history: 'Loan History',
      active: 'Active',
      repaid: 'Repaid',
      rejected: 'Rejected',
      pending: 'Pending',
      dueDate: 'Due Date',
      repayLoan: 'Repay Loan',
      loanDetails: 'Loan Details',
      transactionHash: 'Transaction Hash',
      requestSuccess: 'Loan request submitted successfully',
      repaySuccess: 'Loan repaid successfully',
    },
    trust: {
      title: 'Trust Score',
      breakdown: 'Score Breakdown',
      howToImprove: 'How to improve your score',
      totalScore: 'Total Score',
      badges: 'Badges',
      noBadges: 'You have no badges yet',
    },
  },
  hi: {
    common: {
      appName: 'लोन कंपास',
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि हुई',
      retry: 'पुनः प्रयास करें',
      cancel: 'रद्द करें',
      submit: 'जमा करें',
      next: 'आगे',
      continue: 'जारी रखें',
      back: 'वापस',
      save: 'सहेजें',
      search: 'खोज',
      success: 'सफलता',
      failure: 'विफलता',
      home: 'होम',
      profile: 'प्रोफ़ाइल',
      history: 'इतिहास',
      language: 'भाषा',
      logout: 'लॉगआउट',
    },
    auth: {
      login: 'लॉगिन',
      register: 'रजिस्टर',
      phoneNumber: 'फ़ोन नंबर',
      enterPhone: 'अपना फोन नंबर दर्ज करें',
      otpSent: 'हमने आपके फोन पर एक ओटीपी भेजा है',
      enterOTP: '4-अंकों का कोड दर्ज करें',
      verifyOTP: 'ओटीपी सत्यापित करें',
      resendOTP: 'ओटीपी पुनः भेजें',
      loginSuccess: 'लॉगिन सफल',
      invalidOTP: 'अमान्य ओटीपी। कृपया पुनः प्रयास करें।',
      welcomeBack: 'वापसी पर स्वागत है!',
      newUser: 'नए उपयोगकर्ता? यहां रजिस्टर करें',
      existingUser: 'मौजूदा उपयोगकर्ता? यहां लॉगिन करें',
    },
    dashboard: {
      welcome: 'स्वागत',
      trustScore: 'ट्रस्ट स्कोर',
      availableLoan: 'उपलब्ध लोन राशि',
      requestLoan: 'लोन का अनुरोध करें',
      viewHistory: 'इतिहास देखें',
      trustProfile: 'ट्रस्ट प्रोफाइल',
      myBadges: 'मेरे बैज',
    },
    loan: {
      requestTitle: 'लोन का अनुरोध करें',
      amount: 'राशि',
      purpose: 'उद्देश्य',
      purposePlaceholder: 'आपको लोन किस लिए चाहिए?',
      submit: 'अनुरोध जमा करें',
      history: 'लोन इतिहास',
      active: 'सक्रिय',
      repaid: 'चुकाया गया',
      rejected: 'अस्वीकृत',
      pending: 'लंबित',
      dueDate: 'देय तिथि',
      repayLoan: 'लोन चुकाएं',
      loanDetails: 'लोन विवरण',
      transactionHash: 'लेनदेन हैश',
      requestSuccess: 'लोन अनुरोध सफलतापूर्वक जमा किया गया',
      repaySuccess: 'लोन सफलतापूर्वक चुकाया गया',
    },
    trust: {
      title: 'ट्रस्ट स्कोर',
      breakdown: 'स्कोर विश्लेषण',
      howToImprove: 'अपने स्कोर को कैसे सुधारें',
      totalScore: 'कुल स्कोर',
      badges: 'बैज',
      noBadges: 'आपके पास अभी कोई बैज नहीं है',
    },
  },
  ta: {
    common: {
      appName: 'கடன் திசைகாட்டி',
      loading: 'ஏற்றுகிறது...',
      error: 'பிழை ஏற்பட்டது',
      retry: 'மீண்டும் முயற்சி',
      cancel: 'ரத்து செய்',
      submit: 'சமர்ப்பி',
      next: 'அடுத்து',
      continue: 'தொடர்க',
      back: 'பின்னால்',
      save: 'சேமி',
      search: 'தேடு',
      success: 'வெற்றி',
      failure: 'தோல்வி',
      home: 'முகப்பு',
      profile: 'சுயவிவரம்',
      history: 'வரலாறு',
      language: 'மொழி',
      logout: 'வெளியேறு',
    },
    auth: {
      login: 'உள்நுழைய',
      register: 'பதிவு செய்ய',
      phoneNumber: 'தொலைபேசி எண்',
      enterPhone: 'உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
      otpSent: 'நாங்கள் உங்கள் தொலைபேசிக்கு OTP அனுப்பியுள்ளோம்',
      enterOTP: '4-இலக்க குறியீட்டை உள்ளிடவும்',
      verifyOTP: 'OTP ஐ சரிபார்க்கவும்',
      resendOTP: 'OTP ஐ மீண்டும் அனுப்பு',
      loginSuccess: 'உள்நுழைவு வெற்றி',
      invalidOTP: 'தவறான OTP. மீண்டும் முயற்சிக்கவும்.',
      welcomeBack: 'மீண்டும் வரவேற்கிறோம்!',
      newUser: 'புதிய பயனரா? இங்கே பதிவு செய்யவும்',
      existingUser: 'ஏற்கனவே பயனரா? இங்கே உள்நுழையவும்',
    },
    dashboard: {
      welcome: 'வரவேற்கிறோம்',
      trustScore: 'நம்பகத்தன்மை மதிப்பெண்',
      availableLoan: 'கிடைக்கக்கூடிய கடன் தொகை',
      requestLoan: 'கடன் கோர',
      viewHistory: 'வரலாற்றைக் காண',
      trustProfile: 'நம்பகத்தன்மை சுயவிவரம்',
      myBadges: 'எனது பதக்கங்கள்',
    },
    loan: {
      requestTitle: 'கடன் கோரிக்கை',
      amount: 'தொகை',
      purpose: 'நோக்கம்',
      purposePlaceholder: 'கடன் எதற்காக தேவை?',
      submit: 'கோரிக்கையை சமர்ப்பிக்கவும்',
      history: 'கடன் வரலாறு',
      active: 'செயலில்',
      repaid: 'திருப்பிச் செலுத்தியது',
      rejected: 'நிராகரிக்கப்பட்டது',
      pending: 'நிலுவையில்',
      dueDate: 'காலக்கெடு',
      repayLoan: 'கடனை திருப்பிச் செலுத்து',
      loanDetails: 'கடன் விவரங்கள்',
      transactionHash: 'பரிவர்த்தனை ஹாஷ்',
      requestSuccess: 'கடன் கோரிக்கை வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது',
      repaySuccess: 'கடன் வெற்றிகரமாக திருப்பிச் செலுத்தப்பட்டது',
    },
    trust: {
      title: 'நம்பகத்தன்மை மதிப்பெண்',
      breakdown: 'மதிப்பெண் பகுப்பாய்வு',
      howToImprove: 'உங்கள் மதிப்பெண்ணை எப்படி மேம்படுத்துவது',
      totalScore: 'மொத்த மதிப்பெண்',
      badges: 'பதக்கங்கள்',
      noBadges: 'உங்களிடம் இன்னும் பதக்கங்கள் இல்லை',
    },
  },
};

export default translations;
