export class Schoolclass {
    constructor(public _id: string, public room: string) {}
    units: Unit[] = [];
}

export class Unit {
    constructor(public day: number, public unit: number, public subject: string, public teacherid: string) {}
}

export class Teacher {
    constructor(public firstName: string, public lastName: string, public room: string) {}
}