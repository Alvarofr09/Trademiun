const { jwtVerify } = require("jose");

const verifyToken = async (req) => {
	const { authorization } = req.headers;

	if (!authorization) return false;

	try {
		const token = authorization.split(" ")[1];

		const encoder = new TextEncoder();

		const { payload } = await jwtVerify(
			token,
			encoder.encode(process.env.JWT_SECRET)
		);

		return payload;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

module.exports = { verifyToken };
