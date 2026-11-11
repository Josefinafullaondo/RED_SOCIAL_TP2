import { Request } from 'express';
export declare function extraerCookie(req: Request, nombre: string): string | undefined;
export declare const Cookies: (...dataOrPipes: (string | import("@nestjs/common").ParameterDecoratorOptions | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
