import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { FetchStatus } from "src/models";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface Props {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
  deleteStatus?: FetchStatus;
}

export const DeleteConfirmModal: React.FC<Props> = ({
  title,
  content,
  open,
  onClose,
  onDelete,
  deleteStatus,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose} disabled={deleteStatus === "fetching"}>
            Cancel
          </Button>

          <Button color="warning" onClick={onDelete}>
            {deleteStatus === "fetching" ? (
              <CircularProgress size={20} />
            ) : (
              "Delete"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
