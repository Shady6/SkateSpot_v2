export interface JWTPayload {
    sub: string,
    jti: string,
    email: string,
    uid: string,
    ip: string,
    roles: string[],
    nbf: number,
    exp: number,
    iss: string,
    aud: string
}