import { FC } from "react";
import { Add } from "@mui/icons-material";
import { BaseRecord, HttpError, useTable } from "@pankod/refine-core";
import { Box, Typography, Stack, TextField, Select, MenuItem } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { PropertyCard, CustomButton } from "components";

export const AllProperties: FC = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable<BaseRecord, HttpError>();

  const allProperties = data?.data || [];
  if (isLoading) return <Typography>LOADING...</Typography>;
  if (isError) return <Typography>SORRY,ERROR</Typography>;

  const renderAllProperties = allProperties.map((property) => {
    return (
      <PropertyCard
        key={property._id}
        id={property._id}
        creator={property.creator}
        description={property.description}
        location={property.location}
        photo={property.photo}
        price={property.price}
        propertyType={property.type}
        title={property.title}
      />
    );
  });

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
        mt={2}
      >
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {renderAllProperties.length
              ? "All Properties"
              : "There are no propertiesF"}
          </Typography>
          <Box my={2} display="flex" width="85%" gap={2} flexWrap="wrap">
            <CustomButton
              title="Sort By Price"
              color="#fcfcfc"
              backgroundColor="#475be8"
            />
            <TextField
              variant="outlined"
              placeholder="Search by Title"
              color="info"
              value=""
              onChange={(e) => {}}
            />
            <Select
            variant='outlined'
            color='info'
            displayEmpty
            inputProps={{'aria-label':'Without-label'}}
            required
            onChange={(e)=>{}}
            defaultValue=''
            value=""
            >
              <MenuItem value=''>All</MenuItem>
            </Select>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <Stack direction="row" gap={2} flexWrap="wrap" mt={2}>
        {renderAllProperties}
      </Stack>
    </Box>
  );
};
