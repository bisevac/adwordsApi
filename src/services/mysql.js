import mysql from "mysql";

export default () => {
	return new Promise( ( ( approve, reject ) => {
		const connection = mysql.createConnection( `${$config.mysql}&multipleStatements=true` );

		console.log( `[MYSQL] Connecting... ${$config.mysql}&multipleStatements=true` );

		connection.connect( ( err ) => {
			if ( err ) {
				console.log( `[MYSQL] Database connection error. threadId = [ ${connection.threadId} ]` );
				return reject( err );
			}

			console.log( `[MYSQL] Database connected. [ ${connection.threadId} ] \n` );
			return approve( connection );
		} );
	} ) );
};
