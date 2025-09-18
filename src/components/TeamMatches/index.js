// src/components/TeamMatches/index.js
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
  }

  componentDidMount() {
    this.getTeamMatchesData()
    setTimeout(this.getTeamMatchesData, 0)
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedLatestMatch = this.getFormattedData(data.latest_match_details)
    const updatedRecentMatches = data.recent_matches.map(each =>
      this.getFormattedData(each),
    )

    this.setState({
      isLoading: false,
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: updatedLatestMatch,
      recentMatches: updatedRecentMatches,
    })
  }

  render() {
    const {isLoading, teamBannerUrl, latestMatchDetails, recentMatches} =
      this.state

    return (
      <div className="team-matches-bg">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="team-matches-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <h1 className="latest-matches-heading">Latest Matches</h1>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="match-cards-list">
              {recentMatches.map(match => (
                <MatchCard key={match.id} matchDetails={match} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
