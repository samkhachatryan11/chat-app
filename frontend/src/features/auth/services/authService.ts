const backendApi: string = import.meta.env.VITE_BACKEND_API_URL;

export const authService = {
  login: async (data: { email: string; password: string }) => {
    try {
      const res = await fetch(`${backendApi}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  },

  register: async (data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      const res = await fetch(`${backendApi}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (id: string | undefined) => {
    try {
      const res = await fetch(`${backendApi}/auth/logout/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return await res.json();
    } catch (error) {
      console.log(error);
    }
  },
};
