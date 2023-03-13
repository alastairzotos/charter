import { FetchStatus } from "@bitmetro/create-query";
import { Button, CircularProgress, Modal, SxProps, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ServiceNoId } from "dtos";
import React from "react";

import { FormBox } from "src/components/form-box";
import { ServiceContentSectionEditor } from "src/components/service-page-content-editor/section-editor";

interface Props {
  open: boolean;
  onClose: () => void;
  values: ServiceNoId;
  onChange: (values: ServiceNoId) => void;
  onSave: (values: ServiceNoId) => void;
  saveStatus?: FetchStatus;
}

const modalStyle: SxProps = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxHeight: "100vh",
  overflowY: "scroll",
};

export const ServicePageContentEditor: React.FC<Props> = ({
  open,
  onClose,
  values,
  onChange,
  onSave,
  saveStatus,
}) => {
  const handleSaveClick = () => onSave(values);

  const schemaContentSections = values.serviceSchema.contentSections;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <FormBox title="Page Content">
          <TextField
            label="Description"
            value={values.description}
            onChange={(e) =>
              onChange({ ...values, description: e.target.value })
            }
            multiline
            rows={4}
          />

          {schemaContentSections.map((section) => (
            <ServiceContentSectionEditor
              key={section.key}
              contentSection={section}
              value={values.content?.[section.key]}
              onChange={(sectionValue) =>
                onChange({
                  ...values,
                  content: {
                    ...values.content,
                    [section.key]: sectionValue,
                  },
                })
              }
            />
          ))}

          <Button
            variant="contained"
            onClick={handleSaveClick}
            disabled={saveStatus === 'fetching'}
            sx={{
              width: 200,
              alignSelf: "flex-start",
            }}
          >
            {
              saveStatus === 'fetching'
                ? <CircularProgress size={20} />
                : "Save"
            }
          </Button>

          {saveStatus === 'error' && <Typography>There was an error</Typography>}
        </FormBox>
      </Box>
    </Modal>
  );
};
