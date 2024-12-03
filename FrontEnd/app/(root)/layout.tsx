"use client"

import { useAccessTokenRefresh } from '@/hooks/useAccessTokenRefresh';
import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode, useEffect } from 'react'

const RootLayout = ({children}:{children: ReactNode}) => {
  const { checkAndRefreshToken, cookiesLoaded } = useAccessTokenRefresh();

  useEffect(() => {
    if (cookiesLoaded) {
      
      const intervalId = setInterval(() => {
        checkAndRefreshToken();
      }, 60 * 1000); // Check every minute

      return () => clearInterval(intervalId);
    }
  }, [cookiesLoaded, checkAndRefreshToken]);

  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}

export default RootLayout