import {Button, styled} from "@mui/material";

import {TokenListItemProps} from "../types";

const StyledButton = styled(Button)(({theme}) => ({
  columnGap: 12,
  display: "grid",
  gridTemplateColumns: "54px 1fr auto",
  gridTemplateRows: "auto auto",
  padding: "20px 15px",
  width: "100%",
}));

const Thumb = styled("img")(({theme}) => ({
  gridColumn: "1 / 2",
  gridRow: "1 / -1",
}));

const Title = styled("b")(({theme}) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.5rem",
  fontWeight: 700,
  gridColumn: "2 / 3",
  gridRow: "1 / 2",
  textAlign: "left",
}));

const Subtitle = styled("span")(({theme}) => ({
  color: theme.palette.text.primary,
  fontSize: "1rem",
  gridColumn: "2 / 3",
  gridRow: "2 / 3",
  textAlign: "left",
}));

const Balance = styled("b")(({theme}) => ({
  color: theme.palette.text.secondary,
  fontWeight: 700,
  gridColumn: "3 / 4",
  gridRow: "1 / -1",
}));

export default function TokenListItem({token, ...rest}: TokenListItemProps) {
  return (
    <StyledButton variant="text" {...rest}>
      <Thumb
        alt={`Logo ${token.name}`}
        height={54}
        src="https://trade.defispace.com/5a2ab4d600bc56dccf89.svg"
        width={54}
      />
      <Title>{token.symbol}</Title>
      <Subtitle>{token.name}</Subtitle>
      <Balance>{token.balance}</Balance>
    </StyledButton>
  );
}
