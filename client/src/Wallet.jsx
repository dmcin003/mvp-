import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Wallet = ({ getTotal, wallet }) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ amount }) => {
    axios
      .put("/wallet/total", { total: amount })
      .then((data) => {
        console.log(data);
        getTotal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
  );
};

export default Wallet;
