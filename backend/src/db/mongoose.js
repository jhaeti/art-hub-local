const mongoose = require("mongoose");

// Getting mongo uri
const uri = process.env.MONGO_URI
	

// Connect to mongoDB
mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.info("Mongodb Connected...");
		
	})
	.catch((e) => console.warn("Not connected to mongodb", e));
