'use client';
import {HeroUIProvider} from '@heroui/react'
import StoreProvider from '../store/StoreProvider';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <StoreProvider>
        {children}
      </StoreProvider>
    </HeroUIProvider>
  )
}