
export default async function postRequest(url: string, data: any) {
  const response = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    },
  ).then(res => res.json());

  return response;
}

