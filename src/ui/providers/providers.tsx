'use client';
import {HeroUIProvider, ToastProvider} from '@heroui/react'
import StoreProvider from '../store/StoreProvider';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right"/>
      <StoreProvider>
        {children}
      </StoreProvider>
    </HeroUIProvider>
  )
}