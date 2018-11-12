import xmltojson from "xml2js";
import adwords from "node-adwords";
const Promise = require( "bluebird" );

const AdwordsReport = adwords.AdwordsReport;
const parseString = xmltojson.parseString;

Object.assign( String.prototype, {
	paddingLeft ( paddingString ) {
		return String( paddingString + this ).slice( -paddingString.length );
	},
} );

function formatYYYYMMDD ( date, divider = "-" ) {
	if ( date == null ) {
		return null;
	}
	const obj = [
		date.getDate(),
		date.getMonth() + 1,
		date.getFullYear(),
	];

	return obj[ 2 ].toString()
    + divider + obj[ 1 ].toString().paddingLeft( "00" )
    + divider + obj[ 0 ].toString().paddingLeft( "00" );
}



export default async ( dat,date ) => {
	const options = {
		developerToken : $config.adwords.developertoken,
		userAgent      : "report",
		client_secret  : $config.adwords.secretid,
		refresh_token  : $config.adwords.refleshtoken,
		client_id      : $config.adwords.clientid};

	return new Promise( ( resolve,reject )=>{
		const key=	Object.keys( dat )[ 0 ];
		options.clientCustomerId = key.toString();
		const report = new AdwordsReport( options );
		report.getReport( "v201806", {
			reportName    : "Ad Performance Report",
			reportType    : "AD_PERFORMANCE_REPORT",
			fields        : ["Id", "AdType", "CampaignName", "Clicks", "Impressions"],
			filters       : [{ field : "Id", operator : ["IN"], values : dat[ key ] }],
			dateRangeType : "CUSTOM_DATE", //defaults to CUSTOM_DATE. startDate or endDate required for CUSTOM_DATE
			startDate     : formatYYYYMMDD( date ),
			endDate       : formatYYYYMMDD( new Date() ),
			format        : "XML", // defaults to CSV
		},( error, result ) => {
			if ( error ) {
				reject( error );
			}
			parseString( result, ( err, resultjson ) => {
				if( err ){
					reject( err );
				}
				if ( typeof resultjson.report === "undefined" ) {
					console.log( new Error( "Customer Id:"+key +" Have a Throw ==> " + JSON.stringify( resultjson ) ) );
					resolve();
				}else{
					if( !resultjson.report.table[ 0 ].row ){
						console.log( "Customer Id:"+key + " ID(s) : " + dat[ key ]+ " ===> Dont Found Data" );
						resolve();
					}
					resolve( resultjson.report.table[ 0 ].row );
				}
			} );
		} );

	} );

};




