import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import { Link } from "@pankod/refine-react-router-v6";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@pankod/refine-mui";

import { IProperty } from "interfaces/properties";

const PropertyCard = ({
  id,
  creator,
  title,
  description,
  propertyType,
  price,
  location='',
  photo,
}: IProperty) => {
 

  return (
    <Link to={`/properties/show/${id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          width:'320px',
          maxWidth: "330px",
          height:'100%',
          padding: "10px",
          "&:hover": {
            boxShadow: "0 20px 45px 2px rgba(176,175,176,0.1)",
          },
          cursor: "pointer",
        }}
      >
        <CardMedia
          component="img"
          width="100%"
          height={210}
          image={photo}
          alt={"Card Image"}
          sx={{
            borderRadius: "10px",
          }}
        />
        <CardContent
        sx={{
          display:'flex',
          justifyContent:'space-between',
          gap:'5px',
        }}
        >
          <Stack direction="column" gap={1} flexShrink={1}>
            <Typography >{title}</Typography>
            <Stack direction="row" gap={0.5} alignItems="flex-start">
              <PlaceIcon
                sx={{
                  fontSize: 18,
                  color: "#11142d",
                  marginTop: "0.5",
                }}
              />
              <Typography
              fontSize={14}
              color='#808191'
              >{location}</Typography>
            </Stack>
          </Stack>
          <Box
          display='flex'
          whiteSpace='nowrap'
          px={1.5}
          py={0.5}
          bgcolor='#dadefa'
          height='fit-content'
          borderRadius={1}
          >
           <span>&#8381;  {price}</span>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
