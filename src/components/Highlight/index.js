import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import HighlightCard from './HighlightCard';

export default function Highlight({ summary }) {
  const [casesType, setCasesType] = useState("infected");

  return (
    <Grid container spacing={3}>
      {summary.map((data) => (
        <Grid item sm={4} xs={12}>
          <HighlightCard
            onClick={(e) => setCasesType(data.type)}
            title={data.title}
            active={casesType === data.type}
            count={data.count}
            type={data.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}