import request from "supertest"
import { prisma } from "@/database/prisma"

import { app } from "@/app"

describe("UsersController", () => {
    let user_id: string;

    afterAll(async () => {
        if (user_id) {
            await prisma.user.delete({where: { id: user_id}})
        }
        
    })

    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        })

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty("userWithoutPassword.id");
        expect(response.body.userWithoutPassword.name).toBe("Test User");

        user_id = response.body.userWithoutPassword.id;
    })

    it("should throw an error if user with same email already exists", async () => {
        const response = await request(app).post("/users").send ({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User with same email already exists")
    })  

    it("should throw a validation error if email is invalid", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "invalid-email",
            password: "password123"
        })

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("validation Error")
    })
})