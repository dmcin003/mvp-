import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>Available Funds: {wallet.total}</div>
      <input
        type="text"
        name="amount"
        {...register("amount", { required: true })}
      />
      <input type="submit" value="Add Funds" />
    </form>
  );
};

export default Wallet;
