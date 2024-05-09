const removeUndefinedKeys = async (obj) => {
	try {
		// Itera sobre todas las claves del objeto
		Object.keys(obj).forEach((key) => {
			// Si el valor de la clave es undefined o una cadena vacia, elimina la clave del objeto
			if (obj[key] === undefined || obj[key] === "") {
				delete obj[key];
			}
		});

		return obj;
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = { removeUndefinedKeys };
