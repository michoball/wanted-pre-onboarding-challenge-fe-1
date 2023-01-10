const logInService = async (email: string, password: string) => {
  console.log({ email, password });
  const response = await fetch("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return response.json();
  } else {
    response.json().then((data) => {
      let errorMessage = "Authentication failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
};
const signUpService = async (email: string, password: string) => {
  const response = await fetch("/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return response.json();
  } else {
    response.json().then((data) => {
      let errorMessage = "Authentication failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
};

const AuthService = {
  logInService,
  signUpService,
};

export default AuthService;
