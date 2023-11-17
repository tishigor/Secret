export async function request(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }
    const response = await fetch(`http://localhost${url}`, {
      method,
      headers,
      body,
    });

    return await response.json();
  } catch (e) {
    console.error('Error', e.message);
  }
}
