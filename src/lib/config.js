import yaml from "js-yaml";
import fs from "fs";
import path from "path";

function exit () {
	process.exit( 0 );
}

export default () => {
	let config;

	process.stdout.write( `NODE_ENV [ ${process.env.NODE_ENV} ]\n` );
	console.log( "Environments loading... " );
	const p = path.resolve( __dirname, "../../config.yml" );
	config = yaml.safeLoad( fs.readFileSync( p, "utf8" ) );

	if ( process.env.NODE_ENV === "dev" ) {
		config.mysql=config.mysql.dev;
	} else if ( process.env.NODE_ENV === "local" ) {
		config.mysql=config.mysql.local;
	} else if ( process.env.NODE_ENV === "prod" ) {
		config.mysql=config.mysql.prod;
	}else{
		console.log( "Environment missing." );
		exit();
	}

	return new Promise( ( resolve )=>{
		global.$config = config;
		console.log( "==> SETTINGS ARE SET <==" );
		resolve();
	} );
};

