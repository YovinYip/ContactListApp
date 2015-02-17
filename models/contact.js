var mongoose=require('./../mongodb').mongoose;

// Schema 结构
var contactSchema = new mongoose.Schema({
	name:{type:String},
	email:{type:String},
	number:{type:String}
});

// model
var contactModel=mongoose.model('contactlists', contactSchema);

exports.contactModel=contactModel;