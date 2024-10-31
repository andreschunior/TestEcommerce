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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const ModelosDeCarros_1 = require("./ModelosDeCarros");
// import { AutoModelo } from "./modelosAutos";
let Products = class Products {
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Products.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], Products.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Products.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Products.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Products.prototype, "imagenURL", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ModelosDeCarros_1.CarroModelo, (CarroModelo) => CarroModelo.products),
    (0, typeorm_1.JoinTable)() // Especifica que esta entidad es la propietaria de la relación
    ,
    __metadata("design:type", Array)
], Products.prototype, "modeloCompatible", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)()
], Products);
