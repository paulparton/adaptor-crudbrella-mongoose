var _  = require('lodash');

/*********
* Mongoose CRUD methods
**********/
module.exports =  {

	//Create a new record
	create: function (options, callback){

		console.log('iniside create: ', options);

		this.collection.create(options.body, function(err, result) {

			return callback(err, options);

		}.bind(this));

	},

	//Read an existing record / records
	read: function(options, callback){

		//Find using optional query or find all
		this.collection.find(options.query || {})

			//Process options populate string / object or default to empty string
			.populate(options.populate || '')

			//Execute the query
			.exec(function(err, items){

				if(items.length === 1){
					items = items[0];
				}

				return callback(err, items);

			}.bind(this)

		);

	},

	//Update a record
	update: function(options, callback){

		//If the id has been included in the body, remove it
		var x = options.body._id; 
		delete options.body._id;

		//Check if the body contains any populated fields and depopulate them
		this.utils.depopulate(this.collection, options.body);

		//Use crudbrella read to find the document to be updated
		this.db.read({query: {_id: x}}, function(error, result){

			//custom success handler to complete update, use default for errors
			var updated = _.extend(result, options.body);
			
			updated.save(function (err, actualResult) {

				return callback(err, actualResult);

			}.bind(this));


		});

	},

	//Delete a record
	delete: function(options, callback){

		//If the id has been included in the body, remove it
		if(options.body._id) { delete options.body._id; }

		//Check if the body contains any populated fields and depopulate them
		this.utils.depopulate(this.collection, options.body);

		//Use dryCrud.read to find the document to be deleted
		this.collection.findOneAndRemove({_id: options.query._id}, function(err, result){

			//Pass results and req/res to the callback
			return callback(err, result);

		}.bind(this));

	}

};