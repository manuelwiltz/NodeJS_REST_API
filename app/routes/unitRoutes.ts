import { Business } from "../business/business";
import { Unit } from "../entities/entities";

let express = require('express');
let router = express.Router();

let b: Business;

(async() => {
    b = await Business.create();
})();

// http://localhost:8080/server/api/rest/unit/findall
router.route('/server/api/rest/class/findall').get(async (req: any, res: any, next: any) => {
    res.json(await b.getAllSchoolclasses()); // Refactor to getAllunits()
});

// http://localhost:8080/server/api/rest/unit/findbyclass/5AHITM
router.route('/server/api/rest/unit/findbyclass/:name').get(async (req: any, res: any, next: any) => {
    let name = req.params.name;
    let units: Unit[] = await b.getUnitsBySchoolclass(name)
    res.json(units);
});

// http://localhost:8080/server/api/rest/unit/findbyclass/5AHITM
router.route('/server/api/rest/unit/save/:name').get(async (req: any, res: any, next: any) => {
    let name = req.params.name;
    let unit: Unit = req.body;
    await b.updateUnit(unit, name);
    res.status(200).send('Status Code 200');
});

module.exports = router;