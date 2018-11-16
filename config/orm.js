// var connection = require('../config/connection.js');


// var orm = {

//     selectAll: function (cb) {
//         var queryString = "SELECT * FROM burgers";
//         connection.query(queryString, function (err, result) {
//             if (err) {
//                 throw err;
//             }
//             cb(result);
//         });
//     },

//     insertOne: function (burger, cb) {
//         var queryString = "INSERT INTO burgers (burger_name) VALUES (?)";
//         connection.query(queryString, [burger], function (err, result) {
//             if (err) {
//                 throw err;
//             }
//             cb(result);
//         });
//     },

//     updateOne: function (id, cb) {
//         var queryString = "UPDATE burgers SET devoured = true WHERE id = ?";

//         connection.query(queryString, [id], function (err, result) {
//             if (err) {
//                 throw err;
//             }
//             cb(result);
//         });
//     }
// };

// module.exports = orm;

// Import the MySQL connection object
var connection = require ('./connection.js');

// Helper function for generating MySQL syntax
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Helper function for generating My SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}

// Create the ORM object to perform SQL queries
var orm = {
	// Function that returns all table entries
	selectAll: function(tableInput, cb) {
		// Construct the query string that returns all rows from the target table
		var queryString = "SELECT * FROM " + tableInput + ";";

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	// Function that insert a single table entry
	insertOne: function(table, cols, vals, cb) {
		// Construct the query string that inserts a single row into the target table
		var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	},

	// Function that updates a single table entry
	updateOne: function(table, objColVals, condition, cb) {
		// Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		// console.log(queryString);

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			cb(result);
		});
	}
};

// Export the orm object for use in other modules
module.exports = orm;