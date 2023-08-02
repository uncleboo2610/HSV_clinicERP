import axios from "axios";
import { httpClient } from "../../../core/http";
import { apiEndpoints } from "../../../shared/config/api.config";
import { ILoginRequest, ILoginResponse } from "../types";

class AuthService {
    private static readonly TOKEN_KEY = "token";

    get store() {
        return window.localStorage;
    };

    saveToken(token: string) {
        this.store.setItem(AuthService.TOKEN_KEY, token);
    };

    getToken(): string | null {
        return this.store.getItem(AuthService.TOKEN_KEY) ?? null;
    };

    clearToken() {
        this.store.removeItem(AuthService.TOKEN_KEY);
    }

    logIn({username, password}: ILoginRequest): Promise<ILoginResponse> {
        return httpClient
            .post<ILoginResponse>(apiEndpoints.Auth.LogIn, {
                username,
                password,
            })
            .then((res) => res.data)
            .catch((err) => {
                if (axios.isAxiosError(err) && err?.response?.status === 401) {
                    throw new Error(
                        (err?.response?.data ?? err?.message ?? "") + "",
                    );
                }
                throw err;
            })
    }
}

export const authService = new AuthService();