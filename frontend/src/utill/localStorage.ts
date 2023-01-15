export const StorageControl = {
  storageSetter: (token: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  },
  storageRemover: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  },
  storageGetter: (itemName: string) => {
    return localStorage.getItem(itemName);
  },
};
