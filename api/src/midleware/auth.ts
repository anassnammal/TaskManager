import { expressjwt as jwt } from "express-jwt";

export default function authMidleware() {
    return jwt({ secret: "easy-secret", algorithms: ["HS256"] });
};