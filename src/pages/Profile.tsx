import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  return <h1>Dashboard usera {userId}</h1>;
};

export default Profile;
