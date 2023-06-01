import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button, Typography } from "@pankod/refine-mui";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/"  style={{ textDecoration: 'none' }}>
        {collapsed ? (
          null
        ) : (
          <Typography color='#475BE8' fontWeight={700} fontSize={24}>VALGUR</Typography>
        )}
      </Link>
    </Button>
  );
};
