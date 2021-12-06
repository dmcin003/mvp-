import React, { useEffect, useState } from "react";

const FighterStats = ({ fightersInfo, clickedFighter }) => {
  const [fighterInfo, setFighterInfo] = useState({});
  const [careerStats, setCareerStats] = useState({});

  useEffect(() => {
    getFighterInfo();
  }, []);

  useEffect(() => {
    getFighterCareerStats();
  }, [fighterInfo]);

  const getFighterCareerStats = () => {
    let careerStats = {};
    for (let fighter in fighterInfo.CareerStats) {
      careerStats[fighter] = fighterInfo.CareerStats[fighter];
    }
    setCareerStats(careerStats);
  };

  const getFighterInfo = () => {
    let fighterInfo = {};
    fightersInfo.map((fighter) => {
      // console.log("Fight list", fighter.FirstName + " " + fighter.LastName);
      if (fighter.FirstName + " " + fighter.LastName === clickedFighter) {
        fighterInfo = fighter;
      }
    });

    setFighterInfo(fighterInfo);
  };

  return (
    <div className="stat-row">
      <div className="stat-column">
        <h4>Fighter Info</h4>
        <span>First Name: {fighterInfo.FirstName}</span>
        <span>Last Name: {fighterInfo.LastName}</span>
        <span>WeightClass: {fighterInfo.WeightClass}</span>
        <span>Height: {fighterInfo.Height}</span>
        <span>Weight: {fighterInfo.Weight}</span>
        <span>Reach: {fighterInfo.Reach}</span>
        <span>Wins: {fighterInfo.Wins}</span>
        <span>Losses: {fighterInfo.Losses}</span>
        <span>Draws: {fighterInfo.Draws}</span>
        <span>No Contests: {fighterInfo.NoContests}</span>
        <span>Technical Knockouts: {fighterInfo.TechnicalKnockouts}</span>
        <span>
          Technical Knockouts Losses: {fighterInfo.TechnicalKnockoutLosses}
        </span>
        <span>Submissions: {fighterInfo.Submissions}</span>
        <span>Submission Losses: {fighterInfo.SubmissionLosses}</span>
        <span>Title Wins: {fighterInfo.TitleWins}</span>
        <span>Title Losses: {fighterInfo.TitleLosses}</span>
        <span>Title Draws: {fighterInfo.TitleDraws}</span>
      </div>

      <div className="stat-column">
        <h4>Career stats</h4>

        <span>
          Significant Strikes Landed Per Min:{" "}
          {careerStats.SigStrikesLandedPerMinute}
        </span>
        <span>
          Significant Strike Accuracy: {careerStats.SigStrikeAccuracy}%
        </span>
        <span>Takedown Average: {careerStats.TakedownAverage}</span>
        <span>Submission Average: {careerStats.SubmissionAverage}</span>
        <span>Knockout Percentage: {careerStats.KnockoutPercentage}%</span>
        <span>
          Technical Knockout Percentage:{" "}
          {careerStats.TechnicalKnockoutPercentage}%
        </span>
        <span>Decision Percentage: {careerStats.DecisionPercentage}%</span>
      </div>
    </div>
  );
};

export default FighterStats;
