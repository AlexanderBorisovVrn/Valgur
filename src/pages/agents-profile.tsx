import { useOne } from "@pankod/refine-core";
import { useParams } from "react-router-dom";

import { Profile } from "components";
import { ProfileProps } from "interfaces/agent";

const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: id as string,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;
  
  //@ts-ignore
  const { name, email, avatar,allPorperties} = myProfile;
  return (
    <Profile
      type="Agent"
      name={name}
      email={email}
      avatar={avatar}
      properties={allPorperties}
    />
  );
};

export default AgentProfile;
