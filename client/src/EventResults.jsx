import React, { useState, useEffect } from "react";
import axios from "axios";

const EventResults = ({ results }) => {
  useEffect(() => {}, [results[0]]);

  if (!results[0]) {
    return <div>No results</div>;
  }

  return (
    <div className="scroll">
      <div className="results">
        <h3>{results[0].Name}</h3>
        <h5>{results[0].Status}</h5>
        {results[0].Fights.map((fight, index) => {
          return (
            <div key={index} className="fight-results">
              <div>
                <b>{fight.CardSegment}</b>

                {fight.Fighters.map((fighter, index) => {
                  return (
                    <div key={index}>
                      <div className="fighter-results">
                        <div>{`${fighter.FirstName} ${fighter.LastName}`}</div>
                        <b className="winner">
                          {fighter.Winner ? "Winner" : ""}
                        </b>
                      </div>
                      <div className="fighter-record">
                        <span>
                          {fighter.Winner
                            ? fighter.PreFightWins + 1
                            : fighter.PreFightWins}
                        </span>
                        -
                        <span>
                          {fighter.Winner
                            ? fighter.PreFightLosses
                            : fighter.PreFightLosses + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}

                <div className="fight-info">
                  <div>Status: {fight.Status}</div>
                  <div className="weight-class">{fight.WeightClass}</div>
                  <div>Rounds: {fight.Rounds}</div>
                </div>
              </div>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventResults;
