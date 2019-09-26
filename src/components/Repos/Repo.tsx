import React from 'react';
import { Box, Grid, Link, Paper } from '@material-ui/core';

import { IRepo } from '../../api';

export const Repo: React.FC<{ repo: IRepo }> = ({
  repo: { name, full_name, git_url, updated_at }
}) => {
  return (
    <Box mb={2}>
      <Paper>
        <Box p={1}>
          <Box mb={0.5}>
            <Grid container justify="space-between">
              <Grid item>
                <div>{name}</div>
              </Grid>
              <Grid item>
                <div>{updated_at}</div>
              </Grid>
            </Grid>
          </Box>
          <Box mb={0.5}>{full_name}</Box>
          <Box mb={0.5}>
            <Link href={git_url}>link</Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
