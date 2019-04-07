const router = require('express').Router();
const sanitizer = require('./../../utils/sanitizer');
const con = require('./../../service/db');
const ServiceResponse = require('./../../model/ServiceResponse');

// -------------Login-------------  
// ' OR 1=1 --
// '; DROP TABLE login; --
router.post("/login", (req, res) => {
    try {
      //   connect();
      console.log(con)
      const { username, password } = req.body;
  
      let sql = `select  * from login where username='${username}' and password='${password}'`;
      console.log(sql);
      con.query(sql, function(err, result, fields) {
        if (err) throw err;
  
        if (result && result.length > 0) {
          return res.json(
            new ServiceResponse({
              res: {
                result
              },
              msg: "Success"
            })
          );
        }
        res.json(
          new ServiceResponse({
            res: {
              result
            }
          })
        );
      });
    } catch (err) {
      console.log(err);
      res.json(
        new ServiceResponse({
          err
        })
      );
    }
  });
  
  // ----------Safe Login -------------
  router.post("/safelogin", (req, res) => {
    try {
      const { username, password } = req.body;
      let sql = `select  * from login where username=? and password=?`;
      console.log(username, password);
      con.query(sql, [username, password], function(err, result, fields) {
        console.log(fields);
        if (err) throw err;
        console.log(result);
        if (result && result.length > 0) {
          req.user = "Success";
          res.cookie("user", username);
          return res.json(
            new ServiceResponse({
              res: {
                result
              },
              msg: "Success"
            })
          );
        }
        res.json(
          new ServiceResponse({
            res: {
              result
            }
          })
        );
      });
    } catch (err) {
      console.log(err);
      res.json(
        new ServiceResponse({
          err
        })
      );
    }
  });
  
  // ------------Logout--------------------
  router.get('/logout', (req, res) => {
    res.clearCookie("user");
    res.end();
  });
  
module.exports = router;