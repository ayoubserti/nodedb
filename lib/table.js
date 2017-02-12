"use strict"
//Always keep it simple and stupid

function Table(name,model,DB){
	this.name = name;
	this.model = model;
	this.db = DB;
	this.engine = DB.engine;
}



Table.prototype.select = function(fields,filters){

	this.engine.selectFromTable(this.name,fields,filters)

}

Table.prototype.insert = function (row){
	this.engine.insertInTable(this.name,row);
}

Table.prototype.deleteRow = function (filter){

	this.engine.deleteFromTable(this.name,filter);

}

Table.prototype.update = function (filter,values){

	this.engne.updateTable(this.name,filter,values);
}

export.Table = Table;