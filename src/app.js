import config from "./lib/config";
import _mysql from "./services/mysql";
import log from "./lib/log";
import importData from "./lib/updateDB";
import get from "./lib/getData";
import adwords from "./lib/adwords";

let connection=null;

log();
config();

async function init () {
	try {
		const con = await _mysql();
		connection = con;
		const data= await get( con );
		await adwordsApi( data );

	} catch ( error ) {
		console.log( error );
		terminate();
	}
}

const terminate = function terminate () {
	connection.end( ( err ) => {
		if ( err ) {
			console.log( err );
			//process.exit( 1 );
		} else {
			console.log( "[MYSQL] Database connection closed" );
			//process.exit( 0 );
		}
	} );
};


async function adwordsApi ( data ){
	try {
		let obj={};
		data[ 0 ].forEach( ( item )=>{
			if( typeof item.ids === "string" && item.ids.length ){
				obj[ item.customerId ]=item.ids.split( "," );
			}else{
				console.log( "CustomerID ==> "+item.customerId+" Don't Have adIds" );
			}
		} );
		const toPromise = [];

		for ( let i = 0; i < Object.keys( obj ).length; i++ ) {
			let key=Object.keys( obj )[ i ];
			toPromise.push( adwords( {[ key ] : obj[ key ]} ,data[ 1 ][ 0 ].date ) );
		}
		Promise.all( toPromise )
			.then( function ( result ){
				importData( connection,result );
				terminate();
			} )
			.catch( err=>{
				console.log( new Error( err ) );
				terminate();
			} );
	} catch ( error ) {
		throw Error( error );
	}
}

init();
setInterval( function (){
	init();
} , 1000*120 );
