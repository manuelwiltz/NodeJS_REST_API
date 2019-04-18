import { Business } from "../business/business";

let express = require('express');
let router = express.Router();

let b: Business;

(async() => {
    b = await Business.create();
})();

// http://localhost:8080/server/api/rest/class/findall
router.route('/server/api/rest/class/findall').get(async (req: any, res: any, next: any) => {
    res.json(await b.getAllSchoolclasses());
});

module.exports = router;