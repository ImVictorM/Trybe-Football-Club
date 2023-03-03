const SELECT_LEADERBOARD_QUERY = `
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
  ) as totalPoints
FROM teams
INNER JOIN matches ON home_team_id = teams.id
GROUP BY teams.team_name;
`;

export default SELECT_LEADERBOARD_QUERY;
