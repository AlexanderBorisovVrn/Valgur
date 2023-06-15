import React, { FC } from "react";
import { useList } from "@pankod/refine-core";
import { Typography, Box, Stack } from "@pankod/refine-mui";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  TopAgent,
} from "components";

export const Home: FC = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Dashboard
      </Typography>
      <Box
        mt="20px"
        padding='0 5px'
        display="flex"
        alignItems={{xs:'center'}}
        justifyContent={{ xs: "center", md: "space-between" }}
        flexDirection={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        gap={4}
        width='100%'
      >
        <PieChart
          title="Properties for sales"
          value={684}
          series={[75, 25]}
          colors={["#0E53A7", "#FF9C00"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#0E53A7", "#A66500"]}
        />
        <PieChart
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={["#0E53A7", "#A68100"]}
        />
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[36, 64]}
          colors={["#0E53A7", "#BFA030"]}
        />
      </Box>
      <Stack
        mt="25px"
        width="100%"
        direction={{
          xs: "column",
          lg: "row",
        }}
        gap="15px"
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  );
};
