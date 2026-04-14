const backendApi: string = import.meta.env.VITE_BACKEND_API_URL;

export const authService = {
  login: async (data: { email: string; password: string }) => {
    console.log(data);
    try {
      const res = await fetch(`${backendApi}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return res.json();
    } catch (error) {
      console.log(error);
    }
  },

  register: async (data: any) => {
    try {
      const res = await fetch(`${backendApi}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  },
};
