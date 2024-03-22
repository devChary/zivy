/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";

import InfiniteScroll from "react-infinite-scroller";

// components
import { User } from "../User";

// hooks
import useMozillaUsers from "../../hooks/useMozillaUsers";

import "./styles.css";

const UsersList = () => {
  const { users, fetchUsers, hasMoreItems } = useMozillaUsers();
  const loader = (
    <div key="loader" className="loader">
      Loading ...
    </div>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        overflow: "auto",
      }}
      className="users-wrapper"
    >
      <InfiniteScroll
        pageStart={1}
        loadMore={() => fetchUsers()}
        hasMore={hasMoreItems}
        loader={loader}
        useWindow={false}
      >
        <div className="users-wrapper">
          {users?.map((user: any) => (
            <User key={user.id} {...user} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default UsersList;
