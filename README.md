#adaptor-crudbrella-mongoose
A native mongodb adaptor for <a href="https://www.npmjs.org/package/crudbrella">Crudbrella</a>
###What exactly does it do?
Allows crudbrella to work with mongoose

##Installation
After installing nodeJS, your database of choice and crudbrella, install this adaptor via npm

    npm install adaptor-crudbrella-mongo

##Options
###Populate
To populate a field with data stored in another collection, pass the field name to the populate option during the query.

    //crudbrella
    var crudbrella = require('crudbrella');
        //A database connection
        mongooseCollection = ...,
        //A crudbrella adaptor
        crudbrellaAdaptor = require("adaptor-crudbrella-mongoose"),
        //express app or router
	    app;
	    
        //open a crudbrella!
	    myCrud = crudbrella({
		    type: crudbrellaAdaptor,
		    collection: mongooseCollection
	    });
	    
	    //Query the movies collection and populate the actors from the actors collection
	    app.get('/', myCrud.read({
	        populate: 'actors'
	    }));