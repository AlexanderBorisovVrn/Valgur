import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity({});
  console.log(user)
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.id,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error...</div>;
  //@ts-ignore
  const { name, email, avatar, allPorperties } = myProfile;
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

export default MyProfile;
