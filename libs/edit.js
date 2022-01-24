// A general file for CRUD 

class Edit {
	constructor(schema) {
		this.schema = schema;
	}

	// find all the itema of a specific schema
	find(callback) {
		this.schema.find({}).exec((err, schemaItem) => {
			if (err) {
				return callback(err, null);
			} else if (schemaItem) {
				return callback(null, schemaItem);
			} else {
				return callback(null, null);
			}
		});
	}

	// find an item by it's id
	findById(id, callback) {
		this.schema.findById({ _id: id }).exec((err, schemaItem) => {
			if (err) {
				return callback(err, null);
			} else if (schemaItem) {
				return callback(null, schemaItem);
			} else {
				return callback(null, null);
			}
		});
	}

	// find an item by it's name
	findByName(name, callback) {
		this.schema.find({ name: name }).exec((err, schemaItem) => {
			if (err) {
				return callback(err, null);
			} else if (schemaItem) {
				return callback(null, schemaItem[0]);
			} else {
				return callback(null, null);
			}
		});
	}

	// this would create an item in the specified schema that calls this
	create(items, callback) {
		this.schema.create(items, (err, done) => {
			if (err) {
				return callback(err, null);
			} else if (done) {
				return callback(null, done);
			} else {
				return callback(null, null);
			}
		});
	}

	// delete an item
	remove(id, callback) {
		this.schema.deleteOne({ _id: id }, (err) => {
			if (err) {
				return callback(err, null);
			} else {
				return callback(null, true);
			}
		});
	}

	// update an item
	update({itemToupdateId: id, whatToUpdate: querry, options: opt, newUpdate: update}, callback){
		this.schema.updateOne({ _id: id }, { [opt]: { [querry]: update } }, (err, done) => {
			if (err) {
				return callback(err, null);
			} else if(done) {
				return callback(null, done);
			}else{
				return callback(null, null);
			}
		});
	}
}

module.exports = Edit;