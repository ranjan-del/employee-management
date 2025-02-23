import {  importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

//my firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCclM_rQlr-5raRmYmXTXfYFB8cVLKcohA",
  authDomain: "employee-database-504e8.firebaseapp.com",
  databaseURL: "https://employee-database-504e8-default-rtdb.firebaseio.com",
  projectId: "employee-database-504e8",
  storageBucket: "employee-database-504e8.firebasestorage.app",
  messagingSenderId: "226105664558",
  appId: "1:226105664558:web:2d96cd67ca4323005cabbf"
};



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),  provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ projectId: "employee-crud-1ab72", appId: "1:572189752434:web:5a8ba829ad8187400b96eb", storageBucket: "employee-crud-1ab72.firebasestorage.app", apiKey: "AIzaSyD8eMh4Bikn1nKeGhhFICyNzTO2xim4-nE", authDomain: "employee-crud-1ab72.firebaseapp.com", messagingSenderId: "572189752434", measurementId: "G-3VRHQ4BC13" })), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideAppCheck(() => {
  
  const provider = new ReCaptchaEnterpriseProvider("6LfeZN4qAAAAACLX2anLUSSHjvulh9A4Zzk-3ebn");
  return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
}), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), providePerformance(() => getPerformance()), provideStorage(() => getStorage()), provideRemoteConfig(() => getRemoteConfig()), ]
};

