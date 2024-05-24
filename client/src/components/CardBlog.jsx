import blogs from "../assets/bbddBlog/blogs.js";

const CardBlog = () => {
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id} className="mb-4 w-96 border-0 shadow-xl rounded-xl">
          <div className="max-h-64">
            <img
              src={blog.img}
              className="w-full object-cover"
              alt={blog.titulo}
            />
          </div>
          <div className="mb-2 p-4">
            <h3 className="text-primario text-xl font-bold mt-4 mb-4">
              {blog.titulo}
            </h3>
            <p className="text-lg">{blog.descripcion}</p>
          </div>
          <div className="flex justify-end mr-4 py-2">
            <a href={blog.enlace} target="_blank">
              <div className="flex items-end">
                <button className="bg-secundario px-6 py-2 text-white mt-4 rounded-3xl">
                  Leer más
                </button>
              </div>
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardBlog;
