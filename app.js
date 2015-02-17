var express=require('express');
var app=express();

var mongoose=require('./mongodb').mongoose;
var contactModel=require('./models/contact').contactModel;

var bodyParser=require('body-parser');
app.use(bodyParser.json());


app.use(express.static(__dirname+'/public'));

app.get('/contactlist',function(req,res){
   // mongoose find
    var criteria = {}; // 查询条件
	var fields   = {name : 1, email : 1, number : 1}; // 待返回的字段
	var options  = {};
	contactModel.find(criteria, fields, options, function(error, result){
	    if(error) {
	        console.log("query error:"+error);
	    } else {
	        console.log("query successfully!");
	        res.json(result);
	    }
	    //关闭数据库链接
	});
});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	var contact= new contactModel(req.body);
    contactModel.create(contact,function(error){
	    if(error) {
	        console.log("add error:"+error);
	    } else {
	    	console.log("add successfully!");
	        res.json(contact);
	    }
	    //关闭数据库链接
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	var condition={"_id":id};
	contactModel.remove(condition,function(error,result){
		if(error) {
	        console.log("delete error:"+error);
	    } else {
	        console.log("delete successfully!");
	        res.json(result);
	    }
	});
});

app.get('/contactlist/:id',function(req,res){
	var id=req.params.id;
	console.log("edit:"+id);
	// mongoose find
    var criteria = {"_id":id}; // 查询条件
	var fields   = {name : 1, email : 1, number : 1}; // 待返回的字段
	var options  = {};
	contactModel.findOne(criteria, fields, options, function(error, result){
	    if(error) {
	        console.log("edit error:"+error);
	    } else {
			console.log("edit successfully!");
	        res.json(result);
	    }
	    //关闭数据库链接
	});
});

app.put('/contactlist/:id',function(req,res){
	var conditions = {"_id":req.params.id};
	var update     = new contactModel(req.body);
	//console.log(update);
	var options    = {upsert : true};
	contactModel.update(conditions, update, options, function(error,result){
	    if(error) {
	        console.log("update error:"+error);
	    } else {
	        console.log("update successfully!");
	        res.json(result);
	    }
	    
	});
});

module.exports = app;
