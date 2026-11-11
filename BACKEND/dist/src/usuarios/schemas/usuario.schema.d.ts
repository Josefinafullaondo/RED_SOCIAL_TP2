import { HydratedDocument } from 'mongoose';
export type UsuarioDocument = HydratedDocument<Usuario>;
export declare class Usuario {
    nombre: string;
    apellido: string;
    username: string;
    email: string;
    passwordHash: string;
    rol: 'usuario' | 'administrador';
    fechaNacimiento: Date;
    descripcion: string;
    fotoPerfil: string | null;
    fotoPublicId: string | null;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UsuarioSchema: import("mongoose").Schema<Usuario, import("mongoose").Model<Usuario, any, any, any, any, any, Usuario & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    nombre?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    apellido?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    username?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    email?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    passwordHash?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    rol?: import("mongoose").SchemaDefinitionProperty<"usuario" | "administrador", Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    fechaNacimiento?: import("mongoose").SchemaDefinitionProperty<Date, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    descripcion?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    fotoPerfil?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    fotoPublicId?: import("mongoose").SchemaDefinitionProperty<string, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    activo?: import("mongoose").SchemaDefinitionProperty<boolean, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Usuario, import("mongoose").Document<unknown, {}, Usuario, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, Usuario>;
