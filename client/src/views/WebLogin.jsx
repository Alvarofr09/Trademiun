import { useFormik } from "formik";

import { useAuthContext } from "../context/AuthContext";
import { LoginSchema } from "../components/Formik/LoginSchema";

import "../App.css";

function WebLogin() {
  const { login } = useAuthContext();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  function onSubmit(values, actions) {
    console.log("values", values);
    const user = { email: values.email, password: values.password };

    login(user);
    actions.resetForm();
  }

  return (
    <div className="contenedor_loginWeb">
      <div className="flex justify-center bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl w-screen xl:max-h-fit">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")',
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-700 text-center py-2">
            Iniciar sesión
          </h1>

          {/* FORMIK */}
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <input
                className={`bg-gray-200 text-gray-700 border border-gray-300 py-2 px-4 block w-full appearance-none ${
                  errors.email && touched.email ? "input-error" : ""
                }`}
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="Email"
                onBlur={handleBlur("email")}
              />

              {errors.email && touched.email ? (
                <p className="error_mensaje">{errors.email}</p>
              ) : (
                <p className="py-2"></p>
              )}
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <a href="#" className="text-xs text-gray-500">
                  ¿Olvidó su contraseña?
                </a>
              </div>
              <input
                className={`bg-gray-200 text-gray-700  border border-gray-300 py-2 px-4 block w-full appearance-none ${
                  errors.password && touched.password ? "input-error" : ""
                }`}
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange("password")}
                placeholder="Password"
                onBlur={handleBlur("password")}
              />
              {errors.password && touched.password ? (
                <p className="error_mensaje">{errors.password}</p>
              ) : (
                <p className="py-2"></p>
              )}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primario text-white font-bold py-2 px-4 w-full hover:bg-secundario"
              >
                Login
              </button>
            </div>
          </form>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4" />
            <a href="#" className="text-xs text-center text-gray-500 uppercase">
              O registrate con
            </a>
            <span className="border-b w-1/5 lg:w-1/4" />
          </div>
          <a
            href="#"
            className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">
              Google
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
}

export default WebLogin;
