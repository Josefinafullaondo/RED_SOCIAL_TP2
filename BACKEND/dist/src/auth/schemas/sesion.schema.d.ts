import { HydratedDocument, Types } from 'mongoose';
export type SesionDocument = HydratedDocument<Sesion>;
export declare class Sesion {
    usuario: Types.ObjectId;
    jti: string;
    revocada: boolean;
    expiraEn: Date;
}
export declare const SesionSchema: import("mongoose").Schema<Sesion, import("mongoose").Model<Sesion, any, any, any, any, any, Sesion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sesion, import("mongoose").Document<unknown, {}, Sesion, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Sesion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    usuario?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Sesion, import("mongoose").Document<unknown, {}, Sesion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Sesion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    jti?: import("mongoose").SchemaDefinitionProperty<string, Sesion, import("mongoose").Document<unknown, {}, Sesion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Sesion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    revocada?: import("mongoose").SchemaDefinitionProperty<boolean, Sesion, import("mongoose").Document<unknown, {}, Sesion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Sesion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    expiraEn?: import("mongoose").SchemaDefinitionProperty<Date, Sesion, import("mongoose").Document<unknown, {}, Sesion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Sesion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, Sesion>;
