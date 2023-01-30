import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { FetchStatus } from '../../models';
import { DeleteConfirmModal } from '../modals/delete-confirm';

interface Props {
  isValid: boolean;
  saveStatus?: FetchStatus;
  onDelete?: () => void;
  deleteStatus?: FetchStatus;
  deleteModalTitle: string;
  deleteModalText: string;
}

export const SaveAndDelete: React.FC<Props> = ({ isValid, saveStatus, onDelete, deleteStatus, deleteModalTitle, deleteModalText }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const isSubmitting = saveStatus === 'fetching';

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}
          sx={{ maxWidth: '20%' }}
        >
          {isSubmitting ? <CircularProgress size={20} /> : 'Save'}
        </Button>

        {!!onDelete && (
          <Button
            disabled={isSubmitting}
            color="warning"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        )}
      </Box>

      <DeleteConfirmModal
        title={deleteModalTitle}
        content={deleteModalText}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={onDelete}
        deleteStatus={deleteStatus}
      />
    </>
  )
}