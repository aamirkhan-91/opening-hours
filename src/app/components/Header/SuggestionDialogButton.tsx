'use client';

import Button from '@core-components/Button';
import SuggestionDialog from '@core-components/SuggestionDialog';
import { useState } from 'react';

const SuggestionDialogButton: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow(true)}>Suggest Restaurant</Button>
      <SuggestionDialog show={show} onClose={() => setShow(false)} />
    </>
  );
};

export default SuggestionDialogButton;
