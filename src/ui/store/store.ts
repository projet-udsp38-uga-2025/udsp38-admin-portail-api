import { configureStore } from '@reduxjs/toolkit'
import breadcrumbsReducer from './slices/BreadcrumbsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        breadcrumbs: breadcrumbsReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']