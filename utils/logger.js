
// This code helps me console.log() to the console when in development mode


module.exports = {
	log: (...All)=>{
		 console.log(All);
	},
	err: (...All)=>{
		 console.log("Unexpected Error: ", All);
	}
} 