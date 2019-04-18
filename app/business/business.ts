import { Db } from 'mongodb';
import { SchoolclassRepository } from '../Repository/SchoolclassRepository';
import { TeacherRepository } from '../Repository/TeacherRepository';
import { Teacher, Schoolclass, Unit } from '../entities/entities';
import { Mongo } from '../database/database';

export class Business {

    private repoSchoolclass: SchoolclassRepository;
    private repoTeacher: TeacherRepository;

    private constructor(private db: Db) {
        this.repoSchoolclass = new SchoolclassRepository(db);
        this.repoTeacher = new TeacherRepository(db);
    }

    static async create(): Promise<Business> {
        return new Business(await Mongo.db('TimetableDB'));
    }

    async init() {
        let teachers: Teacher[] = [
            new Teacher('Prof. Manuel', 'Wiltz', 'E21'),
            new Teacher('Prof. Simon', 'Danninger', 'E21')
        ];
        this.repoTeacher.createMany(teachers);

        let schoolclasses: Schoolclass[] = [
            new Schoolclass('5BHITM', '119'),
            new Schoolclass('5AHITM', '121')
        ];

        schoolclasses[0].units.push(new Unit(1, 1, 'SEW', (<any>teachers[0])._id));
        schoolclasses[0].units.push(new Unit(2, 2, 'MDT', (<any>teachers[1])._id));
        schoolclasses[0].units.push(new Unit(3, 3, 'ITP', (<any>teachers[0])._id));
        schoolclasses[1].units.push(new Unit(4, 4, 'AM', (<any>teachers[2])._id));
        schoolclasses[1].units.push(new Unit(5, 5, 'E', (<any>teachers[2])._id));
        schoolclasses[1].units.push(new Unit(6, 6, 'INSY', (<any>teachers[1])._id));
        await this.repoSchoolclass.createMany(schoolclasses);
    }

    async getAllSchoolclasses(): Promise<Schoolclass[]> {
        return this.repoSchoolclass.find(<Schoolclass>{}, {sort: [['_id', 1]]});
    }

    async getAllTeachers(): Promise<Teacher[]> {
        return this.repoTeacher.findAll();
    }
    
    async getUnitsBySchoolclass(schoolclassId: string): Promise<Unit[]> {
        let result = await this.repoSchoolclass.findById(schoolclassId, {projection: {'units': 1}});
        return result.units;
    }

    async updateUnit(unit: Unit, schoolclassId: string) {
        let schoolclass: Schoolclass = await this.repoSchoolclass.findById(schoolclassId);
        if (schoolclass) {
            let _unit = <Unit>schoolclass.units.find(u => u.day == unit.day && u.unit  == unit.unit);
            if (_unit) {
                _unit.subject = unit.subject;
                _unit.teacherid = unit.teacherid;
            } else {
                schoolclass.units.push(unit);
            }
            await this.repoSchoolclass.updateById(schoolclass._id, schoolclass);
        }
    }

}