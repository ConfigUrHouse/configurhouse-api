import { Role } from "../../components/role/role.class"
import RoleService from "../../components/role/role.service"
import { User, UserAttributes } from "../../components/user/user.class"
import UserService from "../../components/user/user.service"
import { testHelpers } from "../__mocks__/test-helpers"

describe("User Service", () => {
    let adminUser: User
    let collabUser: User
    let user: User

    let adminRole: Role
    let collabRole: Role
    let userRole: Role

    beforeEach(() => {
        (adminUser as any) = {
            getUserRoles: jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }])
        };
        (collabUser as any) = {
            getUserRoles: jest.fn().mockResolvedValue([{ id: 1 }, { id: 2 }])
        };
        (user as any) = {
            getUserRoles: jest.fn().mockResolvedValue([{ id: 1 }])
        };
        (adminRole as any) = { id: 3 };
        (collabRole as any) = { id: 2 };
        (userRole as any) = { id: 1 };
    })

    afterEach(() => {
        testHelpers.resetAll()
    })

    it("isAdmin should return true if user has administrator role", async () => {
        jest.spyOn(RoleService, "findRoleByName").mockResolvedValue(adminRole)

        const result = await UserService.isAdmin(adminUser)

        expect(result).toEqual(true)
    })

    it("isAdmin should return false if user has not administrator role", async () => {
        jest.spyOn(RoleService, "findRoleByName").mockResolvedValue(adminRole)

        const result = await UserService.isAdmin(collabUser)

        expect(result).toEqual(false)
    })

    it("isCollaborator should return true if user has collaborator role", async () => {
        jest.spyOn(RoleService, "findRoleByName").mockResolvedValue(collabRole)

        const result = await UserService.isCollaborator(collabUser)

        expect(result).toEqual(true)
    })

    it("isCollaborator should return false if user has not collaborator role", async () => {
        jest.spyOn(RoleService, "findRoleByName").mockResolvedValue(collabRole)

        const result = await UserService.isCollaborator(user)

        expect(result).toEqual(false)
    })

    it("create should throw an error if email is already taken", async () => {
        jest.spyOn(User, "findOne").mockResolvedValue(user)

        const result = UserService.create({
            email: "john.doe@example.com",
            password: "myVerySecurePassword",
            firstname: "John",
            lastname: "DOE"
        } as UserAttributes)

        await expect(result).rejects.toThrowError('Email "john.doe@example.com" is already taken')
    })
})