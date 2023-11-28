import {AuthRequest, AuthServiceInterface, USER_ROLES, UserRepositoryInterface} from "../../types";
import UserRepository from "../user/user.repository";

import jwt from "jsonwebtoken";

// .env SECRET
export const secret = 'secret';

class AuthService implements AuthServiceInterface {
    userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async login(user: AuthRequest): Promise<string> {
        const {username, password} = user;
        if (!username || !password) {
            throw new Error('Invalid input');
        }
        const candidate = await this.userRepository.findByUsername(username);

        const passwordsMuch = this.mockBycrypt(password, candidate.password);

        if (!passwordsMuch) {
            throw new Error('Invalid password');
        }

        return this.mockJwtService(username, candidate.role);
    }

    register({username, password, email}: AuthRequest & { email: string }): Promise<string> {
        throw new Error("Method not implemented.");
    }

    private mockBycrypt(password: string, compare: string) {
        return password === compare;
    }

    private mockJwtService(username: string, role: USER_ROLES): string {
        const payload = {name: username, role};
        return jwt.sign(payload, secret, {expiresIn: '24h'});
    }
}

export default new AuthService(UserRepository);
