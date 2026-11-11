"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCoreModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const auth_constants_1 = require("./constants/auth.constants");
const jwt_cookie_guard_1 = require("./guards/jwt-cookie.guard");
const sesion_schema_1 = require("./schemas/sesion.schema");
let AuthCoreModule = class AuthCoreModule {
};
exports.AuthCoreModule = AuthCoreModule;
exports.AuthCoreModule = AuthCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: auth_constants_1.DURACION_SEG },
                }),
            }),
            mongoose_1.MongooseModule.forFeature([{ name: sesion_schema_1.Sesion.name, schema: sesion_schema_1.SesionSchema }]),
        ],
        providers: [jwt_cookie_guard_1.JwtCookieGuard],
        exports: [jwt_1.JwtModule, mongoose_1.MongooseModule, jwt_cookie_guard_1.JwtCookieGuard],
    })
], AuthCoreModule);
//# sourceMappingURL=auth-core.module.js.map