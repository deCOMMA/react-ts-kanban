export interface AuthCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends AuthCredentials {
    fullName: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
}