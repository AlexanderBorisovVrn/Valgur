import { Box, Button, Stack, Typography } from "@pankod/refine-mui";

type FormVisible = {
  close: (t: boolean) => void;
  children?: any;
};

const PopupBanner = ({ close, children }: FormVisible) => {
  return  (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        bottom: "0",
        right: "0",
        left: "0",
        backgroundColor: "#111111",
      }}
    >
      <Box
        position="relative"
        mt={2.5}
        borderRadius="16px"
        padding="20px"
        display="flex"
        flexDirection="column"
        bgcolor="#fcfcfc"
        width={{ xs: "100%", md: "70%" }}
      >
        {/* close button */}
        <Box
          position="absolute"
          right='0'
          top='0'
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            title="Close"
            onClick={() => close(false)}
            sx={{
              padding:'5px',
              verticalAlign: "middle",
              color: "#2c2c2cdc",
              fontSize: "24px",
            }}
          >
            &#128473;
          </Button>
        </Box>
        {children}
      </Box>
    </Box>
  ) 
};

export default PopupBanner;
