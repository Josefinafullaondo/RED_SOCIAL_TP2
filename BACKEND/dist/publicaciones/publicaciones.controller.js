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
exports.PublicacionesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const jwt_cookie_guard_1 = require("../auth/guards/jwt-cookie.guard");
const usuario_actual_decorator_1 = require("../common/decorators/usuario-actual.decorator");
const crear_publicacion_dto_1 = require("./dto/crear-publicacion.dto");
const publicaciones_service_1 = require("./publicaciones.service");
let PublicacionesController = class PublicacionesController {
    constructor(publicaciones) {
        this.publicaciones = publicaciones;
    }
    crear(dto, archivo, usuario) {
        return this.publicaciones.crear(usuario.sub, dto.texto, archivo);
    }
    listar() {
        return this.publicaciones.listar();
    }
    eliminar(id, usuario) {
        return this.publicaciones.eliminar(id, usuario.sub);
    }
};
exports.PublicacionesController = PublicacionesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen', {
        storage: (0, multer_1.memoryStorage)(),
        limits: { fileSize: 5 * 1024 * 1024 },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, usuario_actual_decorator_1.UsuarioActual)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_publicacion_dto_1.CrearPublicacionDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "listar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, usuario_actual_decorator_1.UsuarioActual)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PublicacionesController.prototype, "eliminar", null);
exports.PublicacionesController = PublicacionesController = __decorate([
    (0, common_1.Controller)('publicaciones'),
    (0, common_1.UseGuards)(jwt_cookie_guard_1.JwtCookieGuard),
    __metadata("design:paramtypes", [publicaciones_service_1.PublicacionesService])
], PublicacionesController);
//# sourceMappingURL=publicaciones.controller.js.map