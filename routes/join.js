var mysql = require('mysql');
var express = require('express');
var router = express.Router();


//참여 투어 리스트 보내기
router.get('/:id', function(req, res, next) {
        connection.query('select * from Request r, Tour t, Photo p where r.user_id = ? and r.tour_no = t.no and p.univ_name = t.univ order by t.no;', [req.params.id], function( error, cursor) {
        if(error != undefined) {
                console.log(error);
                res.status(503).json({result : false});
        }    
        else {
                res.json(cursor);
        }
        });
}); 

    
//관리자 투어 관리 리스트
router.get('/admin/:id', function(req, res, next) {
        connection.query('select * from User u, Tour t, Photo p where t.admin_id = u.id and t.admin_id = ? and p.univ_name = t.univ;', [req.params.id], function( error, cursor) {
        if(error != undefined) {
                res.status(503).json({result : false});
        }
        else {
                res.json(cursor);
        }
        });
});


//투어 삭제
router.get('/tour/delete/:no', function(req, res, next) {
        connection.query('delete from Tour where no = ?;', [req.params.no], function( error, cursor) {
        if(error != undefined) {
                res.status(503).json({result : false});
        }
        else {
                res.status(200).json({result : true});
        }
        });
});


//신청 삭제
router.get('/delete/:no/:id/', function(req, res, next) {
        connection.query('delete from Request where tour_no = ? and user_id = ?;', [req.params.no, req.params.id], function( error, cursor) {
        if(error != undefined) {
                res.status(503).json({result : false});
        }
        else {
                res.status(200).json({result : true});
        }
        });
});

module.exports = router;


