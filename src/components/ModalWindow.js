import styled from 'styled-components';

const { Modal, Box, Button } = require('@mui/material');

const ModalSyled = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const BoxSyled = styled(Box)`
  background-color: #f8f9fa;
  border-radius: 11px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 1rem;

  text-align: center;

  h2 {
    text-align: center;
  }

  & p {
    font-weight: 500;
  }
`;

const ContainerBtns = styled.div`
  display: flex;
  gap: 0.007rem;
`;

const ModalWindow = ({ children, open, handleClose, btnAccept }) => {
  return (
    <ModalSyled
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <BoxSyled sx={{ width: 400 }}>
        {children}

        <ContainerBtns>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            sx={{
              flex: 1,
            }}
          >
            Close
          </Button>
          {btnAccept && (
            <Button
              variant="contained"
              color="success"
              onClick={btnAccept}
              sx={{
                backgroundColor: '#1864ab',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#228be6', // Color cuando se pasa el ratón
                },
                flex: 1,
              }}
            >
              Accept
            </Button>
          )}
        </ContainerBtns>
      </BoxSyled>
    </ModalSyled>
  );
};

export default ModalWindow;
