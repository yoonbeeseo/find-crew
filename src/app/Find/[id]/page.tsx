import { useParams } from "react-router-dom";

const FindDetailPage = () => {
  const params = useParams<{ id: string }>();
  return <div>FindDetailPage:{params?.id}</div>;
};

export default FindDetailPage;
