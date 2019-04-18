import { Business } from "../business/business";

let express = require('express');
let router = express.Router();

let b: Business;

(async() => {
    b = await Business.create();
})();

// http://localhost:8080/server/api/rest/teacher/findall
router.route('/server/api/rest/teacher/findall').get(async (req: any, res: any, next: any) => {
    res.json(await b.getAllTeachers());
});

// localhost:3000/teacher?name=Manuel
router.get('/teacher1', (req: any, res: any) => {
    if (req.query.name) {
        res.send(`You have requested a teacher with the name: ${req.query.name}`);
    } else {
        res.send('You have requested a teacher');
    }
});

// localhost:3000/teacher/Manuel
router.get('/teacher/:name', (req: any, res: any) => {
    let name = req.params.name;
    res.send(`You have requested a teacher with the name: ${name}`);
});

module.exports = router;