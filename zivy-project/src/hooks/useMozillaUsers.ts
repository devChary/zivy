/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { useCallback, useState } from "react";
import { customFetch } from "../utils";

const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

const useMozillaUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState<boolean>(false);

  const [nextPageUrl, setNextPageUrl] = useState(
    "https://api.github.com/orgs/mozilla/members?page=1"
  );

  const fetchUsers = useCallback(async () => {
    if (isLoading || !nextPageUrl) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await customFetch({
        url: nextPageUrl,
      });
      const { data, linkHeader } = response || {};
      setUsers([...users, ...data]);
      const nextItems = linkHeader && linkHeader.includes(`rel=\"next\"`);

      const matched = linkHeader && linkHeader.match(nextPattern)?.[0];
      const url = matched || "";

      setNextPageUrl(url);
      setHasMoreItems(Boolean(nextItems));
    } catch (e) {
      setUsers([]);
      setHasMoreItems(false);
      console.log("Error fetching users");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, nextPageUrl, users]);

  return { hasMoreItems, users, fetchUsers };
};
export default useMozillaUsers;
