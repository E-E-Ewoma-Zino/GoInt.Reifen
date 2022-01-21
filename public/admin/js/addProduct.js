// This script is what would be used to add products to the store

console.log("here");
axios.get("/api/products").then((res)=>{
	console.log("res:", res);
}).catch((err)=>{
	console.error(":::", err);
});