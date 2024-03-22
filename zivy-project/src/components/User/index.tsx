import "./styles.css";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserProps {
  id: number;
  login: string;
  name: string;
}

export const User: React.FC<UserProps> = ({ login }) => {
  return <div className="user-wrapper">{login || ""}</div>;
};
