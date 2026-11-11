import { HydratedDocument, Types } from 'mongoose';
export type PublicacionDocument = HydratedDocument<Publicacion>;
export declare class Publicacion {
    autor: Types.ObjectId;
    texto: string;
    imagenUrl: string | null;
    imagenPublicId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const PublicacionSchema: import("mongoose").Schema<Publicacion, import("mongoose").Model<Publicacion, any, any, any, any, any, Publicacion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    autor?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    texto?: import("mongoose").SchemaDefinitionProperty<string, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    imagenUrl?: import("mongoose").SchemaDefinitionProperty<string, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    imagenPublicId?: import("mongoose").SchemaDefinitionProperty<string, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Publicacion, import("mongoose").Document<unknown, {}, Publicacion, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Publicacion & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, Publicacion>;
