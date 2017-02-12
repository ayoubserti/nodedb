"use strict"

//always keep it simple and stupid

const HDF  	 = require("hdf5");
const Access = require('hdf5/lib/globals').Access;
const hdf5   = HDF.hdf5;
const h5lt   = HDF.h5lt; 
const h5tb   = HDF.h5tb;

export.info = {
	name : "my_engine",
	type : "storage",
	author : "Ayoub Serti",
	email : "ayb.serti@gmail.com",
	license: "MIT"
}


function Engine(file_name,mode){

	this.file = new hdf5.File(file_name, mode);
	if(mode == Access.ACC_CREAT)
	{
		this.head = file.createGroup("head");
		this.file.flush();
	}
	else
	{
		this.file.refresh();
		this.head = file.openGroup("head");
	}
	
}

Engine.prototype.close = function(){
	this.file.flush();
	this.file.close();
}

Engine.prototype.model = function(){

	var table_names = h5lt.readDataset(this.head.id,"tables");

	
}

export.createEngineForReadWrite = function(file_name){
	
	var engine = new Engine(file_name,Access.ACC_RDWR);
	return engine;
}

export.createEngineForCreate =function (file_name){

	var engine = new Engine(file_name,Access.ACC_CREAT);
	return engine;
}

export.createEngineForAppend = function (file_name){

	var engine = new Engine(file_name,Access.ACC_TRUNC);

	return engine;
}






export.engine = {

	selectFromTable : function(tbl_name,fields,filters){



	}


}