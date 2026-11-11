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
const publicaciones_service_1 = require("./publicaciones.service");
const crear_publicacion_dto_1 = require("./dto/crear-publicacion.dto");
const jwt_cookie_guard_1 = require("../auth/guards/jwt-cookie.guard");
const usuario_actual_decorator_1 = require("../common/decorators/usuario-actual.decorator");
let PublicacionesController = class PublicacionesController {
    constructor(publicacionesService) {
        this.publicacionesService = publicacionesService;
    }
    async crear(crearPublicacionDto, usuario, archivo) {
        const usuarioId = usuario.userId || usuario._id;
        return await this.publicacionesService.crear(crearPublicacionDto, usuarioId, archivo);
    }
    async obtenerTodas() {
        return await this.publicacionesService.obtenerTodas();
    }
    async eliminar(id, usuario) {
        const usuarioId = usuario.userId || usuario._id;
        await this.publicacionesService.eliminar(id, usuarioId);
        return { mensaje: 'Publicación eliminada correctamente' };
    }
};
exports.PublicacionesController = PublicacionesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_cookie_guard_1.JwtCookieGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('imagen')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, usuario_actual_decorator_1.UsuarioActual)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_publicacion_dto_1.CrearPublicacionDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PublicacionesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicacionesController.prototype, "obtenerTodas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_cookie_guard_1.JwtCookieGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, usuario_actual_decorator_1.UsuarioActual)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PublicacionesController.prototype, "eliminar", null);
exports.PublicacionesController = PublicacionesController = __decorate([
    (0, common_1.Controller)('publicaciones'),
    __metadata("design:paramtypes", [publicaciones_service_1.PublicacionesService])
], PublicacionesController);
//# sourceMappingURL=publicaciones.controller.js.map