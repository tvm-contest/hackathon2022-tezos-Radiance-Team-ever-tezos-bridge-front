import {ModalUnstyled} from "@mui/base";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {Box, styled} from "@mui/system";
import React from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {hideModal, selectTransfersVisible} from "../store/reducers/transfers";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding: 64px 10px;
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  backdrop-filter: blur(30px);
  background: linear-gradient(
    92.91deg,
    hsla(0, 0%, 100%, 0.06),
    hsla(0, 0%, 100%, 0) 109.76%
  );
`;

function createData(
  direction: string,
  amount: number,
  token: string,
  sender: string,
  receiver: string,
  timestamp: string,
  status: string,
) {
  return {
    amount,
    direction,
    id: Math.random(),
    receiver,
    sender,
    status,
    timestamp,
    token,
  };
}

const rows = [
  createData(
    "TEZ→EVER",
    21,
    "USDC",
    "tz1ih...hYdw7",
    "0:526...836c3",
    "12:23 15.01.2022",
    "SUCCESS",
  ),
  createData(
    "TEZ→EVER",
    0.21,
    "USDC",
    "tz1ih...hYdw7",
    "0:526...836c3",
    "12:34 15.01.2022",
    "WAITING",
  ),
  createData(
    "EVER→TEZ",
    5.000031,
    "USDT",
    "0:526...836c3",
    "tz1ih...hYdw7",
    "10:00 13.01.2022",
    "SUCCESS",
  ),
];

export default function ModalUnstyledDemo() {
  const modalVisible = useAppSelector(selectTransfersVisible);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <div>
      <StyledModal
        BackdropComponent={Backdrop}
        aria-describedby="unstyled-modal-description"
        aria-labelledby="unstyled-modal-title"
        closeAfterTransition
        onClose={handleClose}
        open={modalVisible}
      >
        <Box
          sx={{
            backgroundColor: "hsla(0,0%,100%,.95)",
            border: "1px solid #eee",
            borderRadius: "50px",
            maxWidth: 850,
            overflowY: "auto",
            padding: "50px",
            width: "100%",
          }}
        >
          <Typography
            color="textSecondary"
            sx={{mb: 2, textAlign: "center"}}
            variant="h1"
          >
            Recent transactions
          </Typography>
          <TableContainer>
            <Table aria-label="simple table" sx={{minWidth: 730}}>
              <TableHead>
                <TableRow>
                  <TableCell>Direction</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Token</TableCell>
                  <TableCell align="right">Sender</TableCell>
                  <TableCell align="right">Recipient</TableCell>
                  <TableCell align="right">Timestamp</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{"&:last-child td, &:last-child th": {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {row.direction}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{maxWidth: 100, overflowWrap: "break-word"}}
                    >
                      {row.amount}
                    </TableCell>
                    <TableCell align="right">{row.token}</TableCell>
                    <TableCell align="right">{row.sender}</TableCell>
                    <TableCell align="right">{row.receiver}</TableCell>
                    <TableCell align="right">{row.timestamp}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </StyledModal>
    </div>
  );
}
