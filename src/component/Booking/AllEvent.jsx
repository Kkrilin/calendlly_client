import { useParams } from "react-router-dom";
const AllEvent = () => {
  const params = useParams();

  return <h1>{params.userId}</h1>;
};

export default AllEvent;
