import { useForm } from "../../hooks/useForm";

const Register = ({ onRouteChange, onSubmit, error }) => {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
    });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <form
            id="sign_up"
            className="ba b--transparent ph0 mh0"
            onSubmit={handleSubmit}
          >
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>
            <div className="">
              <button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <div className="lh-copy mt3">
            <button
              type="button"
              onClick={() => onRouteChange("signin")}
              className="f6 link dim black db bg-transparent bn pa0 pointer"
            >
              Sign in
            </button>
          </div>
          {error && (
            <div className="mt3 red">
              <p>{error}</p>
            </div>
          )}
        </div>
      </main>
    </article>
  );
};

export default Register;
