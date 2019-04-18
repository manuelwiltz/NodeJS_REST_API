"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Schoolclass = /** @class */ (function () {
    function Schoolclass(_id, room) {
        this._id = _id;
        this.room = room;
        this.units = [];
    }
    return Schoolclass;
}());
exports.Schoolclass = Schoolclass;
var Unit = /** @class */ (function () {
    function Unit(day, unit, subject, teacherid) {
        this.day = day;
        this.unit = unit;
        this.subject = subject;
        this.teacherid = teacherid;
    }
    return Unit;
}());
exports.Unit = Unit;
var Teacher = /** @class */ (function () {
    function Teacher(firstName, lastName, room) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.room = room;
    }
    return Teacher;
}());
exports.Teacher = Teacher;
