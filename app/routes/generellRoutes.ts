import { Business } from "../business/business";

let express = require('express');
let router = express.Router();

let b: Business;

(async() => {
    b = await Business.create();
})();

// http://localhost:8080/server/api/rest/init
router.get('/server/api/rest/init', (req: any, res: any) => {
    b.init();
    res.send('Initialisiert');
});

module.exports = router;