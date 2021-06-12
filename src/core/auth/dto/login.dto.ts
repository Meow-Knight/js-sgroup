import { Request } from "express";

export interface ILoginDto {
    email: string,
    password: string,
};

export function loginDto(res: Request) : ILoginDto {
    return {
        email: res.body.email,
        password: res.body.password
    }
}