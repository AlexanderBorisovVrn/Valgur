import React from "react";
import { BaseRecord, useList } from "@pankod/refine-core";
import { Box, Typography, Grid } from "@pankod/refine-mui";
import { AgentCard } from "components";
import { IAgentCardProp } from "interfaces/agent";

export const Agents = () => {
  const { data, isLoading, isError } = useList({ resource: "users" });
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }
  if (isError) {
    return <Typography>Error</Typography>;
  }
  const allAgents = (data?.data) || [];

  return (
    <Box bgcolor="#fcfcfc" sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 1 , md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {allAgents.map((agent) => (
          <Grid item xs={2} sm={4} md={4} key={agent.id}>
            <AgentCard 
            id={agent._id}
            name={agent.name}
            email={agent.email}
            avatar={agent.avatar}
            noOfProperties={agent.noOfProperties}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
