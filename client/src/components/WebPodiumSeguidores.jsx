const WebPodiumSeguidores = () => {
  return (
    <section className="py-12  ">
      <div className=" flex justify-center ">
        <div className="flex ">
          <div>
            <div className="flex justify-center">
              <img
                className="inline-block h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="avatar"
              />
            </div>
            <div className="bg-fondoWebApp rounded-lg mt-4 w-44 2xl:w-48  h-28 flex justify-center items-center text-primario font-bold">
              <div>
                <h1 className="text-3xl text-center">2</h1>
                <p>Alvaro</p>
                <h6>8k</h6>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-center">
              <img
                className="inline-block h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="bg-primario rounded-lg mb-4 w-44 2xl:w-48 h-32 flex justify-center items-center text-white font-bold">
              <div>
                <h1 className="text-3xl text-center">1</h1>
                <p>Parra</p>
                <h6>10K</h6>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-center">
              <img
                className="inline-block h-16 w-16 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="avatar"
              />
            </div>
            <div className="bg-fondoWebApp rounded-lg mt-8 w-44 2xl:w-48 h-24 flex justify-center items-center text-primario font-bold">
              <div>
                <h1 className="text-3xl text-center">3</h1>
                <p>PabloFC</p>
                <h6>5k</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebPodiumSeguidores;