import React from 'react';
import { CardContent, Typography, Card, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';
import './HighlightCard.css';

const useStyles = makeStyles({
  title: { fontSize: 18, marginBottom: 5 },
  count: { fontWeight: 'bold', fontSize: 18 },
});

export default function HighlightCard({ title, count, type, active, isRed, ...props }) {
  const classes = useStyles({ type });
  return (
    <Card 
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"}`}
    >
      <CardContent>
        <Typography variant='body2' component='p' className={classes.title}>
          {title}
        </Typography>
        <Typography variant='body2' component='span' className={classes.count}>
          <CountUp end={count} separator=' ' duration={2} />
        </Typography>
      </CardContent>
    </Card>
  );
}