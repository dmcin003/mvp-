import React, { useState } from "react";
import Box from "@mui/material/Box";

import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Wallet = ({ getTotal, wallet, depositMoney }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ amount }) => {
    depositMoney(amount);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: "primary.dark",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div className="wallet">
        <h1>Wallet</h1>
        <div>Available Funds: ${wallet.total.toFixed(2)}</div>
        <span>Add money to start betting Now!</span>
        <div>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="amount"
            placeholder="Amount"
            {...register("amount", { required: true })}
          />
          <input type="submit" value="Add Funds" />
        </form>
      </div>
    </Box>
  );
};

export default Wallet;
