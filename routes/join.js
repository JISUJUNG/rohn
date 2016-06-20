var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
        'host' : '',
        'user' : '',
        'password' : '',
        'database': '',
});

router.post('/',function(req,res,next){
        connection.query('insert into User(id, pw, name, type) values(?,?,?,?);',[req.body.id, req.body.pw, req.body.name, req.body.type], function(error,cursor){
            if(error != undefined){
                res.status(503).json({result:false,reason:"Cannot join"});
            }
            else {
              res.json({result: true});
            }

}); 


        });

router.get('/:id',function(req,res,next){
        connection.query('select * from User where id = ?;',[req.body.id], function(error,cursor){
          if(cursor == undefined){
                    res.json({result : 1});
          }
          else {
              res.status(503).json({result:0,reason:"Cannot join : double ID"});
            }
          });
        });

module.exports = router;
