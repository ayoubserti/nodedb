var hdf5 = require('hdf5').hdf5;
var h5lt  = require('hdf5').h5lt
var Access = require('hdf5/lib/globals').Access;

function readGroup()
{
	var file = new hdf5.File('./attributes.h5', Access.ACC_RDONLY);
	var group = file.createGroup('pmc');
	var data = h5lt.readDataset(group.id,'e1');
	console.log(data);
}


function writeGroup()
{
	var file = new hdf5.File('./attributes.h5', Access.ACC_TRUNC);
	var group = file.createGroup('pmc');
	
	
}
//var notes = [];
//notes.push({alo:11, dd:"ddddd"});
//h5lt.makeDataset(group.id,'e1',"Test");
//
//group.notes = notes;
//group.flush();
//group.close();

readGroup()

