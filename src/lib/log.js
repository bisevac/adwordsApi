import fs from "fs";
import util from "util";
import path from "path";

export default ()=>{
	const p = path.resolve( __dirname, "../../log/adlogs.log" );
	const log_file = fs.createWriteStream( p, {flags : "a"} );
	const log_stdout = process.stdout;

	console.log = function ( d ) { //
		log_file.write( util.format( d ) + "\n" );
		log_stdout.write( util.format( d ) + "\n" );
	};
	console.log( "==> ADWORDS READER STARTING <== " );

	return new Promise( resolve=>{
		resolve();
	} );
};
