import React from 'react'
import { useState } from 'react';
import useCurrencyConverter from './hooks/useCurrencyConverter';
import InputBox from './components/InputBox';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const useCurrencyInfo = useCurrencyConverter(from);

  const options = Object.keys(useCurrencyInfo)

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
    setConvertedAmount(amount * useCurrencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1370514197/photo/financial-stock-market-abstract-graph.jpg?s=612x612&w=0&k=20&c=vj9w9wFf087xc48ileSBDE5alhahnDcm-k779Rz-UXM=')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();

            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={e => setAmount(e)}
                selectCurrency={from}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                amountDisabled={false}
                currencyDisabled={false}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                selectCurrency={to}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisabled
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert from {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

}
export default App