"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtCookieGuard = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const cookies_decorator_1 = require("../../common/decorators/cookies.decorator");
const auth_constants_1 = require("../constants/auth.constants");
const sesion_schema_1 = require("../schemas/sesion.schema");
let JwtCookieGuard = class JwtCookieGuard {
    constructor(jwt, sesiones) {
        this.jwt = jwt;
        this.sesiones = sesiones;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = (0, cookies_decorator_1.extraerCookie)(req, auth_constants_1.ACCESS_COOKIE);
        if (!token)
            throw new common_1.UnauthorizedException('Sesión no iniciada');
        let payload;
        try {
            payload = await this.jwt.verifyAsync(token);
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        }
        const activa = await this.sesiones
            .findOne({ jti: payload.jti, revocada: false })
            .select('_id')
            .lean();
        if (!activa)
            throw new common_1.UnauthorizedException('Sesión cerrada');
        req.user = payload;
        return true;
    }
};
exports.JwtCookieGuard = JwtCookieGuard;
exports.JwtCookieGuard = JwtCookieGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(sesion_schema_1.Sesion.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], JwtCookieGuard);
//# sourceMappingURL=jwt-cookie.guard.js.map