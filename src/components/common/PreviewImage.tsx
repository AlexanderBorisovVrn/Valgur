import React from "react";
import { Box, Button} from "@pankod/refine-mui";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { IClosePrevImage } from "interfaces/components";



export const PreviewImage: React.FC<IClosePrevImage> = ({
  cb,
  url,
  name,
}: IClosePrevImage) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        width: "100px",
        height: "auto",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          border: "1px solid gray",
          borderRadius: "7px",
        }}
        src={url}
        alt={name}
      />

      <Button
        type="button"
        title="Close"
       
        sx={{
          position: "absolute",
          padding:0,
          margin:0,
          top: '5px',
          right:'-13px'
        }}
      >
        {<HighlightOffRoundedIcon sx={{color:'white',width:'24px',height:'auto'}} />}
      </Button>
    </Box>
  );
};
