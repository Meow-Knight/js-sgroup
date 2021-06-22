import { Request } from "express";

export interface ILoginDto {
    email: string,
    password: string,
};

export function loginDto(body: Request | any) : ILoginDto {
    return {
        email: body.email,
        password: body.password
    }
}