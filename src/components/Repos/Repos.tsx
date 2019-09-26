import React, { useEffect, useState } from 'react';
import { Box, Paper, IconButton, Divider } from '@material-ui/core';

import { api, IRepo } from '../../api';
import { Repo } from './Repo';
import { SortIcon } from './SortIcon';

const sortIndex = [0, 1, -1];

const sortFunctionByDate = (index: number) => (a: IRepo, b: IRepo) =>
  Math.sign(
    new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime() * index
  );

const sortFunctionByName = (index: number) => (a: IRepo, b: IRepo) => {
  const { localeCompare } = String();
  if (localeCompare && sortIndex[index] > 0) {
    return a.name.localeCompare(b.name);
  }
  if (localeCompare && sortIndex[index] < 0) {
    return b.name.localeCompare(a.name);
  }
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA > nameB && sortIndex[index] > 0) {
    return 1;
  }
  if (nameA > nameB && sortIndex[index] < 0) {
    return -1;
  }
  if (nameA < nameB && sortIndex[index] < 0) {
    return -1;
  }
  if (nameA < nameB && sortIndex[index] > 0) {
    return -1;
  }
  return 0;
};

const increment = (index: number) =>
  index === sortIndex.length - 1
    ? 0
    : Math.min(sortIndex.length - 1, index + 1);

export const Repos = () => {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [sortByDate, setSortByDate] = useState<number>(0);
  const [sortByName, setSortByName] = useState<number>(0);

  useEffect(() => {
    api.getRepos().then(setRepos);
    return () => {
      setRepos([]);
    };
  }, []);

  const onToggleSortByName = () => {
    setSortByName(increment);
    setSortByDate(0);
  };

  useEffect(() => {
    if (sortByName !== 0) {
      setRepos(repos => repos.slice().sort(sortFunctionByName(sortByName)));
    }
  }, [sortByName]);

  const onToggleSortByDate = () => {
    setSortByDate(increment);
    setSortByName(0);
  };

  useEffect(() => {
    if (sortByDate !== 0) {
      setRepos(repos => repos.slice().sort(sortFunctionByDate(sortByDate)));
    }
  }, [sortByDate]);

  return (
    <Box mt={3}>
      <Box mb={3} clone p={1} display="flex" alignItems="center">
        <Paper>
          Sort by name
          <IconButton onClick={onToggleSortByName}>
            <SortIcon index={sortIndex[sortByName]} />
          </IconButton>
          <Divider orientation="vertical" />
          Sort by date
          <IconButton onClick={onToggleSortByDate}>
            <SortIcon index={sortIndex[sortByDate]} />
          </IconButton>
        </Paper>
      </Box>
      {repos.map(repo => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </Box>
  );
};
