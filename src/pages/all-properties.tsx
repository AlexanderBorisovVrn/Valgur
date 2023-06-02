import { FC, useMemo } from "react";
import { Add } from "@mui/icons-material";
import { BaseRecord, HttpError, useTable } from "@pankod/refine-core";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { PropertyCard, CustomButton } from "components";

const propertiesTypeList = [
  "APARTMENT",
  "VILLA",
  "FARMHOUSE",
  "CONDOS",
  "TOWNHOUSE",
  "DUPLEX",
  "STUDIO",
  "CHALET",
].map((type) => (
  <MenuItem value={type.toLowerCase()} key={type}>
    {type}
  </MenuItem>
));

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

  const currentFilterValues = useMemo(() => {
    const logicalFilter = filters.flatMap((item) =>
      "field" in item ? item : []
    );
    return {
      title: logicalFilter.find((item) => item.field === "title")?.value || "",
      propertyType:
        logicalFilter.find((item) => item.field === "propertyType")?.value ||
        "",
    };
  }, [filters]);

  if (isLoading) return <Typography>LOADING...</Typography>;
  if (isError) return <Typography>SORRY,ERROR</Typography>;

  const allProperties = data?.data || [];
  const currentPrice = sorter.find((item) => item.field === "price")?.order;

  const toggleSort = (field: string) =>
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  const toggleIcon = currentPrice === "asc" ? "↑" : "↓";

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
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: 3,
        }}
        mt={2}
      >
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {renderAllProperties.length
              ? "All Properties"
              : "There are no properties"}
          </Typography>
          <Box my={2} display="flex" width="85%" gap={2} flexWrap="wrap">
            <CustomButton
              title={`Sort Price ${toggleIcon}`}
              color="#fcfcfc"
              backgroundColor="#475be8"
              handleClick={() => toggleSort("price")}
            />
            <TextField
              variant="outlined"
              placeholder="Search by Title"
              color="info"
              value={currentFilterValues.title}
              onChange={(e) => {
                setFilters([
                  {
                    field: "title",
                    operator: "contains",
                    value: e.currentTarget.value
                      ? e.currentTarget.value
                      : undefined,
                  },
                ]);
              }}
            />
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              inputProps={{ "aria-label": "Without-label" }}
              required
              defaultValue=""
              value={currentFilterValues.propertyType}
              onChange={(e) => {
                setFilters(
                  [
                    {
                      field: "propertyType",
                      operator: "eq",
                      value: e.target.value,
                    },
                  ],
                  "replace"
                );
              }}
            >
              <MenuItem value="">All</MenuItem>
              {propertiesTypeList}
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        width='100%'
        justifyContent={{xs:'center',md:'flex-start'}}
        gap={2}
        flexWrap="wrap"
        my={2}
      >
        {renderAllProperties}
      </Stack>
      {renderAllProperties.length > 0 && (
        <Box
          display="flex"
          maxWidth="100%"
          flexDirection="row"
          alignItems="center"
          mt={1}
          gap={2}
        >
          <CustomButton
            title="Previous"
            color="#fcfcfc"
            backgroundColor="#475be8"
            disabled={current < 2}
            handleClick={() => setCurrent(current - 1)}
          />
          <CustomButton
            title="Next"
            color="#fcfcfc"
            backgroundColor="#475be8"
            disabled={current === pageCount}
            handleClick={() => setCurrent(current + 1)}
          />
          <Box display="flex" alignItems="center">
            Page {current} of {pageCount}
          </Box>
          <Select
            variant="outlined"
            color="info"
            inputProps={{ "aria-label": "Without-label" }}
            onChange={(e) => {
              setPageSize(+e.target.value || 12);
            }}
            required
            defaultValue="12"
          >
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="24">24</MenuItem>
          </Select>
        </Box>
      )}
    </Box>
  );
};
