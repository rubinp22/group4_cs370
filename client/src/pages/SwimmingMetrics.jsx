import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button } from '@mui/material';
import { useState } from 'react';
import MuiLink from '@mui/material/Link';

import InputSwimmingExercise from '../components/InputMetrics/InputSwimmingExercise.jsx';
import ViewSwimmingMetrics from '../components/ViewMetrics/ViewSwimmingMetrics.jsx';

function SwimmingMetrics() {
  const [editingData, setEditingData] = useState(false);

  function handleEdit() {
      editingData ? setEditingData(false) : setEditingData(true)
  }

  return (
      <Stack alignItems={"center"}>
          <ViewSwimmingMetrics/>
          {!editingData ? (
              <></>
          ) : (
              <Stack width="82%">
                  <InputSwimmingExercise/>
              </Stack>
          )}

          <Stack direction="row" marginTop={5} spacing={5} justifyContent="center">
              <Button variant="contained" 
                  onClick={handleEdit}
              >
                  {editingData ? "Stop Editing" : "Edit Data"}
              </Button>
              <MuiLink to="../fitnessTypes" component={RouterLink} className="button-link">Back to Fitness Types</MuiLink>
          </Stack>

      </Stack>

    );

}

export default SwimmingMetrics