import React, { useEffect, useState } from "react";
import "../../styles/paymentForm.css";
const PaymentForm = ({ paidValid, setPaidValid }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvCode, setCvCode] = useState("");
  console.log(cardNumber);
  console.log(expiryDate);
  console.log(cvCode);
  useEffect(() => {
    if (cardNumber.length > 0 && expiryDate.length > 0 && cvCode.length > 0) {
      console.log("valid");
      setPaidValid(false);
    } else {
      console.log("invalid");
      setPaidValid(true);
    }
  }, [cardNumber, expiryDate, cvCode]);
  return (
    <div class="container">
      <div class="row">
        <div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Payment Details</h3>
              <div class="checkbox pull-right">
                <label>
                  <input type="checkbox" />
                  Remember
                </label>
              </div>
            </div>
            <div class="panel-body">
              <form role="form">
                <div class="form-group">
                  <label for="cardNumber">CARD NUMBER</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      id="cardNumber"
                      placeholder="Valid Card Number"
                      required
                      autofocus
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <span class="input-group-addon">
                      <span class="glyphicon glyphicon-lock"></span>
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-7 col-md-7">
                    <div class="form-group">
                      <label for="expityMonth">EXPIRY DATE</label>
                      <div class="col-xs-6 col-lg-6 pl-ziro">
                        <input
                          type="text"
                          class="form-control"
                          id="expityMonth"
                          placeholder="MM/YY"
                          required
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-xs-5 col-md-5 pull-right">
                    <div class="form-group">
                      <label for="cvCode">CV CODE</label>
                      <input
                        type="text"
                        class="form-control"
                        id="cvCode"
                        placeholder="CV"
                        required
                        value={cvCode}
                        onChange={(e) => setCvCode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
