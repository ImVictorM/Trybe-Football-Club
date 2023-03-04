const SELECT_HOME_LEADERBOARD_QUERY = `
SELECT
  team_name as name,
  SUM(1) as totalGames,
  SUM(matches.home_team_goals) as goalsFavor,
  SUM(matches.away_team_goals) as goalsOwn,
  SUM(
    CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 1
      ELSE 0
    END
  ) as totalVictories,
  SUM(
    CASE
      WHEN matches.home_team_goals = away_team_goals THEN 1
      ELSE 0
    END
    ) as totalDraws,
  SUM(
    CASE
      WHEN matches.home_team_goals < away_team_goals THEN 1
      ELSE 0
    END
  ) as totalLosses,
  SUM(
    CASE
      WHEN matches.home_team_goals > matches.away_team_goals THEN 3
      WHEN matches.home_team_goals < matches.away_team_goals THEN 0
      ELSE 1
    END
  ) as totalPoints,
  
  ROUND(
    SUM(
      CASE
        WHEN matches.home_team_goals > matches.away_team_goals THEN 3
        WHEN matches.home_team_goals < matches.away_team_goals THEN 0
        ELSE 1
      END
    ) / (SUM(1) * 3) * 100, 2
  ) as efficiency,
  ((SUM(matches.home_team_goals)) - (SUM(matches.away_team_goals))) as goalsBalance
FROM teams
INNER JOIN matches ON home_team_id = teams.id
WHERE matches.in_progress = false
GROUP BY teams.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

const SELECT_AWAY_LEADERBOARD_QUERY = `
SELECT
  team_name as name,
  SUM(1) as totalGames,
  SUM(matches.away_team_goals) as goalsFavor,
  SUM(matches.home_team_goals) as goalsOwn,
  SUM(
    CASE
      WHEN matches.away_team_goals > matches.home_team_goals THEN 1
      ELSE 0
    END
  ) as totalVictories,
  SUM(
    CASE
      WHEN matches.home_team_goals = away_team_goals THEN 1
      ELSE 0
    END
    ) as totalDraws,
  SUM(
    CASE
      WHEN matches.away_team_goals < home_team_goals THEN 1
      ELSE 0
    END
  ) as totalLosses,
  SUM(
    CASE
      WHEN matches.away_team_goals > matches.home_team_goals THEN 3
      WHEN matches.away_team_goals < matches.home_team_goals THEN 0
      ELSE 1
    END
  ) as totalPoints,
  
  ROUND(
    SUM(
      CASE
        WHEN matches.away_team_goals > matches.home_team_goals THEN 3
        WHEN matches.away_team_goals < matches.home_team_goals THEN 0
        ELSE 1
      END
    ) / (SUM(1) * 3) * 100, 2
  ) as efficiency,
  ((SUM(matches.away_team_goals)) - (SUM(matches.home_team_goals))) as goalsBalance
FROM teams
INNER JOIN matches ON away_team_id = teams.id
WHERE matches.in_progress = false
GROUP BY teams.team_name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;
`;

export {
  SELECT_HOME_LEADERBOARD_QUERY,
  SELECT_AWAY_LEADERBOARD_QUERY,
};
