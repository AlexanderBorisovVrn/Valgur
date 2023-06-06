import React from "react";
import { BaseRecord, useList } from "@pankod/refine-core";
import { Box, Typography, Grid, Stack } from "@pankod/refine-mui";
import { IAgentCardProp } from "interfaces/agent";
import { lazy, Suspense } from "react";

import { AgentCard } from "components";

 const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: "users" });
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  if (isError) {
    return <Typography>Error</Typography>;
  }
  const allAgents = data?.data || [];

  return (
    <Box bgcolor="#fcfcfc" sx={{ flexGrow: 1 }}>
      <Stack direction="row" flexWrap="wrap" gap="5px">
        {allAgents.map((agent) => (
          <Suspense key = {agent._id} fallback={<p>Please wait...</p>}>
            <AgentCard
              id={agent._id}
              name={agent.name}
              email={agent.email}
              avatar={agent.avatar}
              noOfProperties={agent.noOfProperties}
            />
          </Suspense>
        ))}
      </Stack>
    </Box>
  );
};
export default Agents