"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
exports.extraerCookie = extraerCookie;
const common_1 = require("@nestjs/common");
function extraerCookie(req, nombre) {
    return req.cookies?.[nombre];
}
exports.Cookies = (0, common_1.createParamDecorator)((nombre, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return nombre ? extraerCookie(req, nombre) : req.cookies ?? {};
});
//# sourceMappingURL=cookies.decorator.js.map