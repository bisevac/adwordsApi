import mysql from "mysql";

export default async function importData ( connection,data ) {
	let sql="";
	let ids=[];
	data.forEach( array => {
		if( Array.isArray( array ) )
			array.forEach( ( item )=>{
				ids.push( item[ "$" ][ "adID" ] );
				sql += mysql.format( "UPDATE mediaplanline_ads SET impression=? ,click = ? WHERE adwordsAdId=?;",
					[item[ "$" ][ "impressions" ],item[ "$" ][ "clicks" ],item[ "$" ][ "adID" ]] );
			} );

	} );
	if( sql.length ){
		await connection.query( sql,( err,result )=>{
			let i=0;
			ids.forEach( ( id )=>{
				if( result[ i ].affectedRows ){
					console.log( "AdwordsAdId ==> " + id + " ==> UPDATED " );
				}else{
					console.log( "AdwordsAdId ==> " + id + " ==> COULD NOT UPDATING" );
				}
				i++;
			} );
			if( err ){
				console.log( err );
			}
		} );
	}
}
