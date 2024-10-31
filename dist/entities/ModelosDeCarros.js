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
exports.CarroModelo = void 0;
const typeorm_1 = require("typeorm");
const Products_1 = require("./Products");
let CarroModelo = class CarroModelo {
};
exports.CarroModelo = CarroModelo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarroModelo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CarroModelo.prototype, "marca", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CarroModelo.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)("integer"),
    __metadata("design:type", Number)
], CarroModelo.prototype, "a\u00F1o", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Products_1.Products, (product) => product.modeloCompatible),
    __metadata("design:type", Array)
], CarroModelo.prototype, "products", void 0);
exports.CarroModelo = CarroModelo = __decorate([
    (0, typeorm_1.Entity)()
], CarroModelo);
