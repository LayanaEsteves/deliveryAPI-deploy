import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";

describe("SessionsController", () => {
    let user_id : string

    afterAll(async () => {
        if (user_id) {
            await prisma.user.delete({where: { id: user_id}})
        }
        
    })

    it("should authenticated a and get acess token", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "Auth_test_user@example.com",
            password: "password123"
        })

        user_id = userResponse.body.userWithoutPassword.id;

        const sessionResponse = await request(app).post("/sessions").send({
            email: "Auth_test_user@example.com",
            password: "password123"
        })

        expect(sessionResponse.status).toBe(200);
        expect(sessionResponse.body.token).toEqual(expect.any(String));
    })
})