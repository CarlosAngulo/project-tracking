export interface IUser {
    displayName?: string,
    email?: string,
    emailVerified?: string,
    isAnonymous?: string,
    metadata?: string,
    phoneNumber?: string,
    photoURL?: string,
    providerData: IUserData,
    providerId?: string,
    refreshToken?: string,
    tenantId?: string,
    uid?: string,
}

export interface IUserData {
    displayName: string | null,
    email: string | null,
    phoneNumber: string | null,
    photoURL: string | null,
    providerId: string,
    uid: string,
}