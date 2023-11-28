"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secret = void 0;
const user_repository_1 = __importDefault(require("../user/user.repository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// .env SECRET
exports.secret = 'secret';
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = user;
            if (!username || !password) {
                throw new Error('Invalid input');
            }
            const candidate = yield this.userRepository.findByUsername(username);
            const passwordsMuch = this.mockBycrypt(password, candidate.password);
            if (!passwordsMuch) {
                throw new Error('Invalid password');
            }
            return this.mockJwtService(username, candidate.role);
        });
    }
    register({ username, password, email }) {
        throw new Error("Method not implemented.");
    }
    mockBycrypt(password, compare) {
        return password === compare;
    }
    mockJwtService(username, role) {
        const payload = { name: username, role };
        return jsonwebtoken_1.default.sign(payload, exports.secret, { expiresIn: '24h' });
    }
}
exports.default = new AuthService(user_repository_1.default);
