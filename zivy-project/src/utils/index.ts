interface IFetch {
  url: string;
  params?: string;
}

const customFetch = async ({ url }: IFetch) => {
  const DEFAULT_OPTIONS: RequestInit = {
    mode: "cors",
  };

  try {
    const response = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      ...DEFAULT_OPTIONS,
    });
    const linkHeader = response.headers.get("Link");
    const data = await response.json();

    return { data, linkHeader };
  } catch (e) {
    throw new Error();
  }
};

export { customFetch };
