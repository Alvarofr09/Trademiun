export const convertToBase64 = (file) => {
	return new Promise((resolve, reject) => {
		console.log(file);
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};
