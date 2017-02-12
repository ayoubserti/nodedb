+"use strict"
var hdf5 = require('hdf5').hdf5;
var h5lt  = require('hdf5').h5lt
var Access = require('hdf5/lib/globals').Access;
var h5tb = require('hdf5').h5tb;
const h5pt = require('hdf5').h5pt;



function addAttributes()
{
	var file = new hdf5.File('./data.h5', Access.ACC_TRUNC);
	var group = file.createGroup("head")
	group.name = "Groups Head";
	group.length = 1;
	group.stamp = 10;
	group.flush();
	group.close();
}


function getAttributes()
{
	var file = new hdf5.File('./data.h5', Access.ACC_RDONLY);
	var group = file.openGroup("pmc")
	group.refresh();
	var mbrs = group.getMemberNames();	
	Object.getOwnPropertyNames(mbrs).forEach(function(att){
		console.log(att);	
	})
	
}

function getMetas()
{	
	var file = new hdf5.File('./data.h5', Access.ACC_RDONLY);
	var group = file.openGroup("head")	
	group.refresh()
	console.log(group.getNumAttrs());
	console.log(group.getNumObjs());
	console.log(group.name)
	console.log(group.length)
	console.log(group.stamp)

}

function readGroup()
{
	var file = new hdf5.File('./data.h5', Access.ACC_RDONLY);
	var group = file.openGroup('pmc');
	var data = h5lt.readDataset(group.id,1);
	console.log(data);
}


function writeGroup(elm,val)
{
	var file = new hdf5.File('./table.h5', Access.ACC_TRUNC);
	var group = file.createGroup('global');

	h5lt.makeDataset(group.id, elm, val)
	group.close();
	file.close();
	
	
}


//var notes = [];
//notes.push({alo:11, dd:"ddddd"});
//h5lt.makeDataset(group.id,'e1',"Test");
//
//group.notes = notes;
//group.flush();
//group.close();



//for(var i=0; i<100;i++) 	writeGroup(i,""+i)


//writeGroup(buf);

//readGroup()
//addAttributes();
//readGroup()
//getMetas();
//readGroup()

function makeTable()
{
	var file = new hdf5.File('./table.h5', Access.ACC_TRUNC);
	let group;
	/*try{
		group = file.openGroup("global")
	}
	catch(e)
	{
		group = file.createGroup("global")	
	}
	if(group.id == -1) group = file.createGroup("global")	
	*/

	group = file.createGroup("global")	
	var tableModel = new Array(1);
	var fieldArray1 = Array(2)
	var fieldArray2 = Array(2)
	fieldArray1.name = "ID";
	fieldArray1[0] = new Uint8Array(10);
	for(let i=0; i<10; i++) fieldArray1[i]= i+1;

	tableModel[0] = fieldArray1;
	fieldArray2.name = "name"
	tableModel[1] = fieldArray2;

	let pTable = new h5pt.PacketTable(0,1);


	const table  = new h5pt.PacketTable(1, 5);
    table.record = {};
    table.record.Set          = "Single Point";
    table.record["Date Time"] = "Mon Nov 24 13:10:44 2014";
    table.record.Name         = "Temperature";
    table.record.Value        = 7.4;
    table.record.Units        = "Celcius";

	h5pt.makeTable(group.id,"table1",table);
	//console.log(h5tb.getTableInfo(group.id,"table1"))

	
	/*group.flush();
	group.close();
	file.flush();*/
	group.close();
	file.close();
}




function addRecored()
{

}

function readTable(){

	var file = new hdf5.File('./table.h5', Access.ACC_RDWR);
	var group = file.openGroup("global")

	console.log(h5pt.readTable(group.id,"table1"));

}

makeTable();

readTable();