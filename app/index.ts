import { Teacher, Unit } from './entities/entities';
import { Business } from './business/business';

let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
var cors = require('cors');

let app = express();
let generellRoutes = require('./routes/generellRoutes');
let teacherRoutes = require('./routes/teacherRoutes');
let schoolclassRoutes = require('./routes/schoolclassRoutes');
let unitRoutes = require('./routes/unitRoutes');

app.use(bodyParser.json());
app.use(cors());

// Log
app.use((req: any, res: any, next: any) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

app.use(generellRoutes);
app.use(teacherRoutes);
app.use(schoolclassRoutes);
app.use(unitRoutes);

// 404
app.use((req: any, res: any, next: any) => {
    res.status(404).send('404 - Sorry');
});

// 500
app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.info(`Server is running at http://localhost:${PORT}/server`);
});

function initAndTestBusiness() {
    (async () => {
        console.log('Starting Nr2 ...');
        let b: Business = await Business.create();
        b.init();
        let teachers: Teacher[] = await b.getAllTeachers();

        b.getAllSchoolclasses().then(f => console.log(f));
        b.getUnitsBySchoolclass('5BHITM').then(list => list.forEach(p => {
            console.log(p);
        }));
        await b.updateUnit(new Unit(1, 1, 'ABC', (<any>teachers[0])), '5BHITM');
        b.getUnitsBySchoolclass('5BHITM').then(list => list.forEach(p => console.log(p)));
    })();
}