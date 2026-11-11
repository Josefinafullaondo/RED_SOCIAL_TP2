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
var UsuariosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const imagenes_service_1 = require("../imagenes/imagenes.service");
const usuario_schema_1 = require("./schemas/usuario.schema");
let UsuariosService = UsuariosService_1 = class UsuariosService {
    constructor(model, imagenes) {
        this.model = model;
        this.imagenes = imagenes;
    }
    static sinPassword(doc) {
        const { passwordHash, ...publico } = doc;
        return publico;
    }
    existePorEmail(email) {
        return this.model.exists({ email });
    }
    existePorUsername(username) {
        return this.model.exists({ username });
    }
    async crear(datos) {
        const doc = await this.model.create({
            ...datos,
            fechaNacimiento: new Date(datos.fechaNacimiento),
            rol: datos.rol,
        });
        return UsuariosService_1.sinPassword(doc.toObject());
    }
    buscarPorEmailOUsernameConPassword(identificador) {
        return this.model
            .findOne({
            $or: [{ email: identificador.toLowerCase() }, { username: identificador.toLowerCase() }],
        })
            .select('+passwordHash')
            .lean();
    }
    buscarPorId(id) {
        return this.model.findById(id).lean();
    }
    async actualizarFoto(id, foto) {
        const previo = await this.model.findById(id).select('fotoPublicId').lean();
        const subida = await this.imagenes.procesarYSubir(foto, {
            carpeta: 'perfiles',
            ancho: 400,
            alto: 400,
            fit: 'cover',
        });
        const actualizado = await this.model
            .findByIdAndUpdate(new mongoose_2.Types.ObjectId(id), { $set: { fotoPerfil: subida.url, fotoPublicId: subida.publicId } }, { new: true })
            .select('-passwordHash')
            .lean();
        if (previo?.fotoPublicId)
            await this.imagenes.eliminar(previo.fotoPublicId);
        return actualizado;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = UsuariosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        imagenes_service_1.ImagenesService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map