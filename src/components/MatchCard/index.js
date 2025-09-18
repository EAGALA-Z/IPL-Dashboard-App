// src/components/MatchCard/index.js
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  const statusClass = matchStatus === 'Won' ? 'won' : 'lost'

  return (
    <li className="match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-logo"
      />
      <p className="match-team-name">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${statusClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
