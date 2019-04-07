const router = require('express').Router();
const sanitizer = require('./../../utils/sanitizer');
const con = require('./../../service/db');
const ServiceResponse = require('./../../model/ServiceResponse');
console.log(sanitizer);
// -----------Routes--------------
router.post("/list", async (req, res) => {
    const { item, description } = await sanitizer(req.body);
    let sql = `insert into list (item, description) values ('${item}', '${description}')`;
    con.query(sql, (err, result) => {
      if (err) {
        res.json(
          new ServiceResponse({
            err
          })
        );
        throw err;
      }
      return res.json(
        new ServiceResponse({
          res: {
            msg: "Success",
            result
          }
        })
      );
    });
  });
  
router.get("/list", (req, res) => {
    let sql = `select * from list`;
    con.query(sql, (err, result, fields) => {
      if (err) {
        res.json(
          new ServiceResponse({
            err
          })
        );
        throw err;
      }
      return res.json(
        new ServiceResponse({
          res: {
            msg: "Success",
            result
          }
        })
      );
    });
  });

module.exports = router;