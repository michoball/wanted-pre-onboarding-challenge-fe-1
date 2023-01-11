const logInService = async (email: string, password: string) => {
  const response = await fetch("/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "Authentication failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const signUpService = async (email: string, password: string) => {
  const response = await fetch("/users/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    response.json().then((data) => {
      let errorMessage = "Authentication failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    });
  }
  return response.json();
};

const AuthService = {
  logInService,
  signUpService,
};

export default AuthService;
