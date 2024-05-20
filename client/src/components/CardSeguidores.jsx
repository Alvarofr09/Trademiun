const CardSeguidores = () => {
  return (
    <section className="py-2 mx-2">
      <div className="flex flex-row max-w-xl mx-auto p-2 bg-terciario rounded-full">
        <div className="ml-1 self-center">
          <img
            className="inline-block h-20 w-20 rounded-full ring-2 ring-transparent basis-4/12 "
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="avatar"
          />
        </div>

        <div className="mb-2 ml-4 basis-4/12">
          <h6 className="inline-block ml-3 text-white font-bold text-start">
            Pablo Trader
          </h6>
          <p className="text-tipografia text-start ml-3 mb-2 ">
            10k seguidores
          </p>
          <button className="bg-white ml-2 text-center rounded-3xl w-32">
            Seguir
          </button>
        </div>
        <div className="mb-2 ml-4 basis-4/12">
          <h3 className="text-secundario text-xl font-bold mt-4 ml-8">10K </h3>
          <p className="text-tipografia ml-4">seguidores</p>
        </div>
      </div>
    </section>
  );
};

export default CardSeguidores;
