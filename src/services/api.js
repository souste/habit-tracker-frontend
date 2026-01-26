const API_BASE = "http://localhost:3000";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    return { error: result?.message || "Request failed" };
  }
  return result;
}

export const login = async (loginData) => {
  const result = await apiFetch("auth/login", {
    method: "POST",
    body: JSON.stringify(loginData),
  });

  if (result.error) return result;

  if (result.data?.token) {
    localStorage.setItem("token", result.data.token);
  }
  return result;
};

export const getMe = async () => {
  return apiFetch("auth/me");
};

export const getHabits = async () => {
  return apiFetch("habits", {});
};

export const createHabit = async (habitData) => {
  return apiFetch("habits", {
    method: "POST",
    body: JSON.stringify(habitData),
  });
};
