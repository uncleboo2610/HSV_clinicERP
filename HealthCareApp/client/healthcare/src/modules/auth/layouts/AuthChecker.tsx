import React from 'react'
import { useUserProfileStore } from '../store/auth.store';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthChecker = () => {
    const { user } = useUserProfileStore();

    if (!user) {
        // return <Navigate to="/auth/login" />
    }
    
  return <Outlet />
}
