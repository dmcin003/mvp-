import React, { useState, useEffect } from "react";
import axios from "axios";

const EventResults = ({ results }) => {
  useEffect(() => {}, [results[0]]);

  if (!results[0]) {
    return <div>No results</div>;
  }

  return (
    <div>
      Results
      <h3>{results[0].Name}</h3>
      <h5>{results[0].Status}</h5>
      {results[0].Fights.map((fight, index) => {
        return (
          <div key={index}>
            <div>
              <span>{fight.CardSegment}</span>
              <div>
                {fight.Fighters.map((fighter, index) => {
                  return (
                    <div key={index}>
                      <div>{`${fighter.FirstName} ${fighter.LastName}`}</div>
                      <div>
                        <span>{fighter.PreFightWins}</span>-
                        <span>{fighter.PreFightLosses}</span>
                      </div>
                      <span>{fighter.Winner ? "Won" : ""}</span>
                    </div>
                  );
                })}
              </div>
              <div>
                <div>Rounds:{fight.Rounds}</div>
                <div>{fight.Status}</div>
                <div>{fight.WeightClass}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventResults;
