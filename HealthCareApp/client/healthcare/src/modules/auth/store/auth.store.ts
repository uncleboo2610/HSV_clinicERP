import { create } from "zustand";
import { staffService } from "../../staff/services/staff.service";

export interface UserProfileStore {
    user?: any;
    isLoading: boolean;
    error?: Error;

    loadProfile(): Promise<void>;
}

export const useUserProfileStore = create<UserProfileStore>((set: any, get: any) => ({
    user: undefined,
    isLoading: true,
    async loadProfile() {
        set({
            isLoading: true,
            error: undefined,
        });
        try {
            const res = await staffService.getProfile();
            set({
                user: res.data,
            });
        } catch (e) {
            set({
                error: e as Error,
            });
            throw e;
        } finally {
            set({
                isLoading: false,
            });
        }
    },
}));