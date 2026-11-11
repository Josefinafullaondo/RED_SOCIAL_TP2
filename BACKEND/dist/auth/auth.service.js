"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const crypto_1 = require("crypto");
const mongoose_2 = require("mongoose");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const imagenes_service_1 = require("../imagenes/imagenes.service");
const auth_constants_1 = require("./constants/auth.constants");
const sesion_schema_1 = require("./schemas/sesion.schema");
let AuthService = class AuthService {
    constructor(usuarios, jwt, imagenes, sesiones) {
        this.usuarios = usuarios;
        this.jwt = jwt;
        this.imagenes = imagenes;
        this.sesiones = sesiones;
    }
    async registrar(dto, file) {
        const existeEmail = await this.usuarios.existePorEmail(dto.email);
        const existeUsername = await this.usuarios.existePorUsername(dto.username);
        if (existeEmail || existeUsername) {
            throw new common_1.BadRequestException('El correo o el nombre de usuario ya se encuentran registrados');
        }
        let fotoPerfilUrl = '';
        if (file) {
            const subida = await this.imagenes.procesarYSubir(file, {
                carpeta: 'perfiles',
                ancho: 400,
                alto: 400,
                fit: 'cover',
            });
            fotoPerfilUrl = subida.url;
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const rol = dto.rol || 'usuario';
        return this.usuarios.crear({
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            username: dto.username,
            fechaNacimiento: dto.fechaNacimiento,
            descripcion: dto.descripcion,
            rol,
            fotoPerfil: fotoPerfilUrl,
            passwordHash,
        });
    }
    async login(dto) {
        const usuario = await this.usuarios.buscarPorEmailOUsernameConPassword(dto.identificador);
        const credencialesOk = !!usuario && (await bcrypt.compare(dto.password, usuario.passwordHash));
        if (!usuario || !credencialesOk || !usuario.activo) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const jti = (0, crypto_1.randomUUID)();
        await this.sesiones.create({
            usuario: usuario._id,
            jti,
            expiraEn: new Date(Date.now() + auth_constants_1.DURACION_SEG * 1000),
        });
        const token = await this.jwt.signAsync({
            sub: usuario._id.toString(),
            rol: usuario.rol,
            jti,
        });
        return { token, usuario: usuarios_service_1.UsuariosService.sinPassword(usuario) };
    }
    async cerrarSesion(token) {
        if (!token)
            return;
        const payload = this.jwt.decode(token);
        if (payload?.jti) {
            await this.sesiones.updateOne({ jti: payload.jti }, { $set: { revocada: true } });
        }
    }
    async perfil(usuarioId) {
        const usuario = await this.usuarios.buscarPorId(usuarioId);
        if (!usuario)
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        return usuarios_service_1.UsuariosService.sinPassword(usuario);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, mongoose_1.InjectModel)(sesion_schema_1.Sesion.name)),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService,
        imagenes_service_1.ImagenesService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map