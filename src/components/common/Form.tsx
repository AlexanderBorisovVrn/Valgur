import { FC } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@pankod/refine-mui";
import { IForm } from "interfaces/components";
import CustomButton from "./CustomButton";
import { PreviewImage } from "./PreviewImage";

const Form: FC<IForm> = ({
  type,
  formLoading,
  handleImageChange,
  handleSubmit,
  onFinishHandler,
  propertyImage,
  register,
}) => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius="16px" padding="20px" bgcolor="#fcfcfc">
        <form
          onSubmit={handleSubmit(onFinishHandler)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11124d",
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              autoComplete="hello"
              {...register("title", {
                required: true,
              })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11124d",
              }}
            >
              Enter Description
            </FormHelperText>
            <TextareaAutosize
              minRows={6}
              required
              placeholder="Write a description"
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: "#919191",
              }}
              {...register("description", {
                required: true,
              })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                required
                displayEmpty
                inputProps={{
                  "aria-label": "Without label",
                }}
                defaultValue="apartment"
                {...register("propertyType", {
                  required: true,
                })}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">Farmhouse</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11124d",
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                type="number"
                id="outlined-basic"
                color="info"
                variant="outlined"
                autoComplete="hello"
                {...register("price", {
                  required: true,
                })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11124d",
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              autoComplete="hello"
              {...register("location", {
                required: true,
              })}
            />
          </FormControl>

          <Stack direction="column" gap={1} justifyContent="center" mb={2}>
            <Stack direction="row" gap={2} alignItems="center">
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16,
                }}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    //@ts-ignore
                    handleImageChange(e.target.files[0]);
                  }}
                />
              </Button>
            </Stack>
            {propertyImage?.name ? (
              <Stack
                direction="row"
                gap={1}
                sx={{
                  padding: "5px 10px",
                }}
              >
                <PreviewImage
                  cb={handleImageChange}
                  url={propertyImage.url}
                  name={propertyImage.name}
                />
              </Stack>
            ) : null}
          </Stack>

          <CustomButton
            color="#fcfcfc"
            title={formLoading ? "Submitting..." : "Submit"}
            type="submit"
            backgroundColor="#475be8"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
