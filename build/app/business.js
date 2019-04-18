"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var SchoolclassRepository_1 = require("./SchoolclassRepository");
var TeacherRepository_1 = require("./TeacherRepository");
var entities_1 = require("./entities");
var database_1 = require("./database");
var Business = /** @class */ (function () {
    function Business(db) {
        this.db = db;
        this.repoSchoolclass = new SchoolclassRepository_1.SchoolclassRepository(db);
        this.repoTeacher = new TeacherRepository_1.TeacherRepository(db);
    }
    Business.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = Business.bind;
                        return [4 /*yield*/, database_1.Mongo.db('TimetableDB')];
                    case 1: return [2 /*return*/, new (_a.apply(Business, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    Business.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var teachers, schoolclasses;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        teachers = [
                            new entities_1.Teacher('Prof. Manuel', 'Wiltz', 'E21'),
                            new entities_1.Teacher('Prof. Daniel', 'Aistleitner', 'E21'),
                            new entities_1.Teacher('Prof. Simon', 'Danninger', 'E21')
                        ];
                        this.repoTeacher.createMany(teachers);
                        schoolclasses = [
                            new entities_1.Schoolclass('5BHITM', '119'),
                            new entities_1.Schoolclass('5AHITM', '121')
                        ];
                        schoolclasses[0].units.push(new entities_1.Unit(1, 1, 'SEW', teachers[0]._id));
                        schoolclasses[0].units.push(new entities_1.Unit(2, 2, 'MDT', teachers[1]._id));
                        schoolclasses[0].units.push(new entities_1.Unit(3, 3, 'ITP', teachers[0]._id));
                        schoolclasses[1].units.push(new entities_1.Unit(4, 4, 'AM', teachers[2]._id));
                        schoolclasses[1].units.push(new entities_1.Unit(5, 5, 'E', teachers[2]._id));
                        schoolclasses[1].units.push(new entities_1.Unit(6, 6, 'INSY', teachers[1]._id));
                        return [4 /*yield*/, this.repoSchoolclass.createMany(schoolclasses)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Business.prototype.getAllSchoolclasses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repoSchoolclass.find({}, { sort: [['_id', 1]] })];
            });
        });
    };
    Business.prototype.getAllTeachers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repoTeacher.findAll()];
            });
        });
    };
    Business.prototype.getUnitsBySchoolclass = function (schoolclassId) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repoSchoolclass.findById(schoolclassId, { projection: { 'units': 1 } })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.units];
                }
            });
        });
    };
    Business.prototype.updateUnit = function (unit, schoolclassId) {
        return __awaiter(this, void 0, void 0, function () {
            var schoolclass, _unit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repoSchoolclass.findById(schoolclassId)];
                    case 1:
                        schoolclass = _a.sent();
                        if (!schoolclass) return [3 /*break*/, 3];
                        _unit = schoolclass.units.find(function (u) { return u.day == unit.day && u.unit == unit.unit; });
                        if (_unit) {
                            _unit.subject = unit.subject;
                            _unit.teacherid = unit.teacherid;
                        }
                        else {
                            schoolclass.units.push(unit);
                        }
                        return [4 /*yield*/, this.repoSchoolclass.updateById(schoolclass._id, schoolclass)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Business;
}());
exports.Business = Business;
