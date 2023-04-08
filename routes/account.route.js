const express = require("express");
const { AccountModel } = require("../models/account.model");

const accountRouter = express.Router();

accountRouter.get("/getDetails/:id", async (req, res) => {
  const id = req.params.id;
  console.log(req.params);

  try {
    console.log(id);
    let data = await AccountModel.findOne({ panNo: id });
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

accountRouter.post("/openAccount", async (req, res) => {
  const payload = req.body;
  console.log(payload);
  try {
    if (payload.panNo) {
      var accounts = await AccountModel.find({ panNo: payload.panNo });
    } else if (payload.email) {
      var accounts = await AccountModel.find({ email: payload.email });
    }
    console.log(accounts);
    if (accounts.length) {
      res.send("success");
    }
    let account = AccountModel(payload);

    await account.save();

    res.send("success");
  } catch (err) {
    console.log(err);
    console.log("something went wrong");
  }
});

accountRouter.patch("/updateKYC/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  //   console.log(req.params);
  console.log(payload, id);
  try {
    await AccountModel.findByIdAndUpdate({ _id: id }, payload);

    res.send("updated successfully");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

accountRouter.patch("/depositMoney/:id", async (req, res) => {
  let amount = req.body.amount;
  const id = req.params.id;
  //   console.log(req.params);
  try {
    const { initialBalance } = await AccountModel.findOne({ _id: id });
    amount = initialBalance + amount;
    console.log(amount);
    await AccountModel.findByIdAndUpdate(
      { _id: id },
      { initialBalance: amount }
    );

    res.send("money credited successfully");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

accountRouter.patch("/withdrawMoney/:id", async (req, res) => {
  let amount = req.body.amount;
  const id = req.params.id;
  try {
    const { initialBalance } = await AccountModel.findOne({ _id: id });
    amount = initialBalance - amount;
    await AccountModel.findByIdAndUpdate(
      { _id: id },
      { initialBalance: amount }
    );

    res.send("money debited successfully");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

accountRouter.delete("/closeAccount/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await AccountModel.findByIdAndDelete({ _id: id });
    res.send("Account deleted");
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
});

module.exports = { accountRouter };
