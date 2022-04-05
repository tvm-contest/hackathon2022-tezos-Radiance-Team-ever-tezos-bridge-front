import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {
  hideModal,
  selectTransfers,
  selectTransfersVisible,
} from "../store/reducers/transfers";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";

export default function RecentTransactions() {
  const modalVisible = useAppSelector(selectTransfersVisible);
  const transfers = useAppSelector(selectTransfers);
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(hideModal());
  }

  return (
    <Modal
      BackdropComponent={Backdrop}
      aria-labelledby="recent-modal-title"
      closeAfterTransition
      onClose={handleClose}
      open={modalVisible}
    >
      <ModalContainer
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          height: "100%",
          maxWidth: 850,
          overflowY: "hidden",
          paddingRight: "42px",
        }}
      >
        <Typography
          color="textSecondary"
          id="recent-modal-title"
          sx={{mb: 2, textAlign: "center"}}
          variant="h1"
        >
          Recent transactions
        </Typography>
        <TableContainer
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "30px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "30px",
            },
            maxHeight: "90%",
          }}
        >
          <Table
            aria-label="simple table"
            stickyHeader
            sx={{
              minWidth: 730,
              paddingRight: "8px",
            }}
          >
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
              {transfers.map((row) => (
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
                  <TableCell align="right">{row.token.symbol}</TableCell>
                  <TableCell
                    align="right"
                    sx={{maxWidth: 100, overflowWrap: "break-word"}}
                  >
                    {row.sender}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{maxWidth: 100, overflowWrap: "break-word"}}
                  >
                    {row.receiver}
                  </TableCell>
                  <TableCell align="right">
                    {dayjs(row.createdAt).format("HH:MM DD-MM-YY")}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ModalContainer>
    </Modal>
  );
}
