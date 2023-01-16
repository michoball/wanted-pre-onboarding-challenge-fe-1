export const errorHandler =
  <T extends (...args: any[]) => Promise<any>>(callback: T) =>
  async (...args: Parameters<T>) => {
    const userToken = localStorage.getItem("token");
    if (!userToken) return alert("user is no logged in");
  };
