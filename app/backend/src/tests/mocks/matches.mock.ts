export const ALL_MATCHES_FROM_DB = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Grêmio",
    },
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Internacional",
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Ferroviária",
    },
    awayTeam: {
      teamName: "Avaí/Kindermann",
    },
  },
];

export const IN_PROGRESS_MATCHES_FROM_DB = ALL_MATCHES_FROM_DB
  .filter((match) => match.inProgress === true);
  
export const NOT_IN_PROGRESS_MATCHES_FROM_DB = ALL_MATCHES_FROM_DB
  .filter((match) => match.inProgress === false);
