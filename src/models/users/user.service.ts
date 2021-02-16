import bcrypt from "bcryptjs"
import { User } from "./user.class";

export interface IUserCreateParams {
    firstName: string
    lastName: string
    email: string
    password: string
    phoneNumber?: string
    emailVerifiedAt?: Date
}

export default class UserService {
    public static async create(params: IUserCreateParams) {
        if (await User.findOne({ where: { email: params.email } })) {
            throw 'Email "' + params.email + '" is already taken'
        }
        const hashedPassword = bcrypt.hashSync(params.password, 8)
        await User.create({
            firstName: params.firstName.trim(),
            lastName: params.lastName.trim(),
            email: params.email,
            password: hashedPassword,
            phoneNumber: params.phoneNumber
        })
    }
}