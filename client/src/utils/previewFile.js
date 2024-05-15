export function previewFiles(file, callback) {
	const reader = new FileReader();
	reader.readAsDataURL(file);

	reader.onloadend = () => {
		callback(reader.result);
	};
}
