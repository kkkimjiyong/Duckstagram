export const getToken = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  } else {
    return null;
  }
};
