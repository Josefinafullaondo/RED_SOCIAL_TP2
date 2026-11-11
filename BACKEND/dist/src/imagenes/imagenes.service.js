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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
const sharp_1 = __importDefault(require("sharp"));
let ImagenesService = class ImagenesService {
    constructor(config) {
        cloudinary_1.v2.config({
            cloud_name: config.getOrThrow('CLOUDINARY_CLOUD_NAME'),
            api_key: config.getOrThrow('CLOUDINARY_API_KEY'),
            api_secret: config.getOrThrow('CLOUDINARY_API_SECRET'),
            secure: true,
        });
    }
    async procesarYSubir(file, opciones) {
        if (!file.mimetype.startsWith('image/')) {
            throw new common_1.BadRequestException('El archivo debe ser una imagen');
        }
        let buffer;
        try {
            buffer = await (0, sharp_1.default)(file.buffer)
                .rotate()
                .resize({
                width: opciones.ancho,
                height: opciones.alto,
                fit: opciones.fit,
                withoutEnlargement: true,
            })
                .webp({ quality: 80 })
                .toBuffer();
        }
        catch {
            throw new common_1.BadRequestException('Imagen inválida o corrupta');
        }
        const res = await new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream({ folder: opciones.carpeta, resource_type: 'image' }, (error, result) => {
                if (error || !result)
                    return reject(error ?? new Error('Cloudinary sin resultado'));
                resolve(result);
            })
                .end(buffer);
        });
        return { url: res.secure_url, publicId: res.public_id };
    }
    async eliminar(publicId) {
        await cloudinary_1.v2.uploader.destroy(publicId).catch(() => undefined);
    }
};
exports.ImagenesService = ImagenesService;
exports.ImagenesService = ImagenesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImagenesService);
//# sourceMappingURL=imagenes.service.js.map