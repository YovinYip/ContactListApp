// 引用mongoose 模块
var mongoose = require('mongoose');

//配置连接串 mongodb://<db_user>:<db_password>@<hostname>:<port>/<dbname>
var dbURI="mongodb://localhost/contactlist";

//连接mongodb数据库 
/*
    两种方法来打开数据库连接（mongoose.connect和createConnection）：
    一般就使用mongoose.connect(db);
    需要使用多数据库连接时，使用第二种方法:
    var connectName = mongoose.createConnection(db)
*/
mongoose.connect(dbURI);

//Mongodb连接日志 运行日志信息
mongoose.connection.on('connected', function () {
     console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
      console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
      console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
      mongoose.connection.close(function () {
          console.log('Mongoose disconnected through app termination');
          process.exit(0);   
       });
});

exports.mongoose=mongoose;