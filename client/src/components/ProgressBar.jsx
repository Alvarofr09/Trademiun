const ProgressBar = ({ titulo, porcentaje }) => {
  return (
    <div className="mb-2">
      <p className="text-tipografia ml-3 xl:ml-8">{titulo}</p>
      <div className="flex justify-center">
        <div className="w-[95%] bg-gray-400 rounded-full dark:bg-gray-700">
          <div
            className="bg-secundario text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${porcentaje}` }}
          >
            {porcentaje}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
