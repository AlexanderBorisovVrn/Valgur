import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";


import {IInfoBarProp,IAgentCardProp} from 'interfaces/agent'

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const InfoBar = ({ icon, name }: IInfoBarProp) => (
    <Stack
        flex={1}
        minWidth={{ xs: "100%", sm: 300 }}
        gap={1.5}
        padding='0 5px'
        direction="row"
    >
        {icon}
        <Typography fontSize={14} color="#808191"   >
            {name}
        </Typography>
    </Stack>
);

const AgentCard = ({
    id,
    name,
    email,
    avatar,
    noOfProperties,
}: IAgentCardProp) => {
    const { data: currentUser } = useGetIdentity({
    });
    const generateLink = () => {
        if (currentUser.email === email) return "/my-profile";

        return `/agents/show/${id}`;
    };

    return (
        <Box
            component={Link}
            to={generateLink()}
            sx={{
                display: "flex",
                gap:'10px',
                width:{xs:'calc(100% - 30px)',sm:'calc(50% - 45px)',xl:'calc(33.333% - 75px)'},
                padding:'15px',
                flexDirection: { xs: "column", sm: "row" },
                flexGrow:1,
                textDecoration:'none',
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.295)",
                },
            }}
        >
            <img
                src={
                    checkImage(avatar)
                        ? avatar
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                alt="user"
                width={90}
                height={90}
                style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <Stack
                direction="column"
                justifyContent="space-between"
                flex={1}
                gap={{ xs: 4, sm: 2 }}
            >
                <Stack
                    gap={2}
                    direction="row"
                    flexWrap="wrap"
                    alignItems="center"
                >
                    <Typography  fontSize={22} fontWeight={600} color="#11142d">
                        {name}
                    </Typography>
                    <Typography fontSize={14} color="#808191">
                        Real-Estate Agent
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    <InfoBar
                        icon={<EmailOutlined sx={{ color: "#808191",}} />}
                        name={email}
                    />
                    <InfoBar
                        icon={<Place sx={{ color: "#808191" }} />}
                        name="London"
                    />
                    <InfoBar
                        icon={<Phone sx={{ color: "#808191" }} />}
                        name="+502-3231-4141"
                    />
                    <InfoBar
                        icon={<LocationCity sx={{ color: "#808191" }} />}
                        name={`${noOfProperties || 'No'} Properties`}
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

export default AgentCard;