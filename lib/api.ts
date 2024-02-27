export const fetcher = async ({ url, method, body, json = true }) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('API error:', res.status, errorText);
    throw new Error('API error');
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

/* Registering ---------------------- */

export const register = (user) => {
  return fetcher({ url: '/api/register', method: 'POST', body: user });
};

/* Sign in --------------------------- */

export const signin = (user) => {
  return fetcher({ url: '/api/signin', method: 'POST', body: user });
};

/* New Project ---------------------- */
export const createNewProject = async (name) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
    json: true,
  });
};
