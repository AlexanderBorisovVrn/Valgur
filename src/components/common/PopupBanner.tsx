import { Box, Button, Stack, Typography } from "@pankod/refine-mui";

type FormVisible = {
  close: (t: boolean) => void;
  isOpened: boolean;
  children: any;
};

const PopupBanner = ({ close, isOpened, children }: FormVisible) => {
  return isOpened ? (
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
          right='15px'
          width="40px"
          height="60px"
          display="flex"
          padding='5px'
          justifyContent="center"
          alignItems="center"
        >
          <Button
            title="Close"
            onClick={() => close(false)}
            sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              verticalAlign: "middle",
              color: "#2c2c2cdc",
              fontSize: "24px",
              width:'100%',
              height:'100%',
              borderRadius:"50%"
            }}
          >
            &#128473;
          </Button>
        </Box>

        {children}
      </Box>
    </Box>
  ) : null;
};

export default PopupBanner;
