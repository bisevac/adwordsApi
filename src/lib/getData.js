export default ( _con ) => {
	return new Promise( ( resolve,reject )=>{
		const queryString="SELECT adwordsCustomerId as customerId, group_concat(ads.adwordsAdId) as ids FROM mediaplanline_ads ads "+
    " JOIN mediaplanline mp  ON mp.id=ads.mediaplanlineId"+
    " WHERE ads.sync =1 AND ads.type=3"+
    " AND mp.startDate <= NOW() AND NOW() <= DATE_ADD(mp.endDate, INTERVAL 7 DAY)"+
    "	group by ads.adwordsCustomerId;"+
    " SELECT MIN(mp.startDate) date FROM mediaplanline_ads ads"+
    " JOIN mediaplanline mp  ON mp.id=ads.mediaplanlineId"+
    " WHERE ads.sync =1 AND ads.type=3"+
    " AND mp.startDate <= NOW() AND NOW() <= DATE_ADD(mp.endDate, INTERVAL 7 DAY)"+
    " group by ads.adwordsCustomerId;";
		_con.query( queryString,( err,result )=>{
			if( err ){
				console.log( err );
				reject();
			}
			console.log( "==> DATA FOR EDITING DATE : "+ new Date() + " <==" );
			console.log( JSON.stringify( result[ 0 ] ) + "\n" );
			resolve( result );
		} );
	}
	);};
