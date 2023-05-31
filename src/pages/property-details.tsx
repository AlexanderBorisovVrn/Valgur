import React from "react";
import { Typography, Stack, Box, Rating } from "@pankod/refine-mui";
import { useDelete, useGetIdentity, useShow } from "@pankod/refine-core";
import { useParams, useNavigate } from "@pankod/refine-react-router-v6";
import { Map } from "components/common/Map";

import {
  ChatBubble,
  Delete,   
  Edit,
  Phone,
  Place,
  Star,
} from "@mui/icons-material";
import { CustomButton } from "components";

export const PropertyDetails: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { id } = useParams();
  const { mutate } = useDelete();
  const { queryResult } = useShow();
  const { data, isLoading, isError } = queryResult;
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  const handleDeleteProperty = () => {
    const response = window.confirm(
      "Are you shure you want to delete this property?"
    );

    if (response) {
      mutate(
        { resource: "properties", id: id as string },
        {
          onSuccess: () => {
            navigate("/properties");
          },
        }
      );
    }
  };

  const handleEditProperty = () => {
    navigate("/properties/edit/" + id);
  };
  const propertyDetails = data?.data ?? {};
  window.ymaps.geocode(propertyDetails.location).then(res=>console.log())

  return (
    <Box padding="15px" bgcolor="#fcfcfc" borderRadius="10px">
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Details
      </Typography>
      <Box
        mt="20px"
        display="flex"
        gap="10px"
        flexDirection={{ xs: "column", lg: "row" }}
      >
        <Box style={{ objectFit: "cover", borderRadius: "10px" }}>
          <img
            style={{ width: "100%", height: "auto", borderRadius: "10px" }}
            src={propertyDetails.photo}
            alt={propertyDetails.title}
          />
          <Typography
            variant="body1"
            fontWeight={500}
            textAlign="justify"
            mt="20px"
          >
            {propertyDetails.description}
          </Typography>
         
        </Box>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          borderRadius="10px"
          padding={{ xs: "0 20px", lg: "0 10px" }}
          width={{ xs: "100%", lg: "50%" }}
          height="auto"
        >
          <Typography variant="h2" fontWeight={700} color="#11142d">
            {propertyDetails.title}
          </Typography>
          <Stack
            direction="row"
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            padding="10px 5px"
          >
            <Typography
              variant="subtitle1"
              fontSize={20}
              fontWeight={500}
              sx={{
                "&::first-letter": {
                  textTransform: "uppercase",
                },
              }}
            >
              {propertyDetails.propertyType}
            </Typography>
            <Typography fontWeight={500} color="#11142d" fontSize={24}>
              &#8381; {propertyDetails.price}
            </Typography>
          </Stack>

          <Box display="flex" alignItems="center" gap="0.5">
            <Place />
            {propertyDetails.location.toUpperCase()}
          </Box>
          <Box my={1}>
            <Rating
              readOnly
              onChange={(e, value) => console.log(value)}
              name="size-large"
              defaultValue={3}
              size="large"
              max={5}
            />
          </Box>

          <Stack
            direction="row"
            width="100%"
            justifyContent={{ xs: "space-around", sm: "flex-start" }}
            mt={4}
            gap={{ sm: "30px", lg: "20px" }}
          >
            <CustomButton
              color="#fcfcfc"
              title="Edit"
              backgroundColor="#475be8"
              handleClick={handleEditProperty}
            />
            <CustomButton
              color="#fcfcfc"
              title="Delete"
              backgroundColor="#da1e28"
              handleClick={handleDeleteProperty}
            />
          </Stack>
          <Box height={{xs:'200px',sm:'300px'}} width="100%" mt={{xs:'10px',md:'15px'}}>
            <Map location={[54.6345,32.63]}/>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
