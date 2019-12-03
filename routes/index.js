let express = require('express');
let router = express.Router();
let taskCategory = require('../controllers/productTask');
/* GET home page. */
router.get('/', taskCategory.loadHomePage);

module.exports = router;
 