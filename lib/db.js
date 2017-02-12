"use strict"
//Always keep it simple and stupid

var Table = require("./table.js")

function DB( name , model,engine){

	//TODO: validate engine

	/*
		model = {
				table1: {
					field1:{
							isKey : true,
							index : <index_type>
							type : <"int","float",...>
					}
				}
		}
	*/
	this.name = name;
	this.model = model;
	this.engine = engine; //dependency inversion of engine
	var table_names = Object.getOwnPropertyNames(model);
	this.tables = {};
	
	for ( var i = 0; i< table_names.length ; i++){

		tbl = this.createTable(table_names[i],this.model[table_names[i]]);
		this.tables[table_names[i]] = tbl;

	}
}


DB.prototype.createTable = function(name,model) //could throw exception
{
	tbl = new Table(this,name,model);
	return tbl;
}



export.DB  = DB;