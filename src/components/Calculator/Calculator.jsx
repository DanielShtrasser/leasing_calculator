import React, { useEffect, useState } from "react";

import {DataInput} from "../DataInput"
import {DataOutput} from "../DataOutput";

import styles from './Calculator.module.scss'

function Calculator() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [price, setPrice] = useState('1000000')
  const [initial, setInitial] = useState('10')
  const [monthsAmount, setMonthsAmount] = useState('1')

  const [monthPay, setMonthPay] = useState(0)
  const [contractPrice, setContractPrice] = useState(0)
  const [initialInMoney, setInitialInMoney] = useState(0)

  const formatter = new Intl.NumberFormat('ru-RU')
  const formattedPrice = formatter.format(Number(price))
  const formattedInitialInMoney = formatter.format(initialInMoney)
  const formattedContractPrice = formatter.format(Math.trunc(contractPrice))
  const formattedMonthPay = formatter.format(Math.trunc(monthPay))

  useEffect(() => {
    function getMonthPay() {
      return (price - (price / 100 * initial)) * ((0.035 * Math.pow((1 + 0.035), monthsAmount)) / (Math.pow((1 + 0.035), monthsAmount) - 1))
    }

    function getIinitialInMoney() {
      return initial * price / 100
    }

    setInitialInMoney(getIinitialInMoney())
    setMonthPay(getMonthPay())
    setContractPrice(Number(initialInMoney) + Number(monthsAmount) * getMonthPay())
  }, [price, initial, initialInMoney, monthsAmount, monthPay])

  const dataInputProps = {
    price,
    setPrice,
    initial,
    setInitialInMoney,
    setInitial,
    monthsAmount,
    setMonthsAmount,
    formattedPrice,
    formattedInitialInMoney,
    isSubmitting
  }

  const dataOutputProps = {
    formattedContractPrice,
    formattedMonthPay,
    isSubmitting
  }

  async function onSubmit(e) {
    e.preventDefault()

    // const formData = new FormData(e.target)
    // formData.append('initail_payment_percent', initial)

    const dataObject = Object.fromEntries(e.target.elements)
    dataObject.initail_payment_percent = initial
    const dataJson = JSON.stringify(dataObject)

    try {
      setIsSubmitting(true)
      await fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
        },
        body: dataJson,
        mode: 'no-cors',
      }).then(res => console.log(res))
      setIsSubmitting(false)
    } catch (error) {
      console.log('HTTP Error ', error);
      setIsSubmitting(false)
    }
  }

  return (
    <form name="leasing_calculator" className={styles.calcForm} onSubmit={onSubmit}>
      <h1 className={styles.headerText}>Рассчитайте стоимость автомобиля в лизинг</h1>
      <DataInput {...dataInputProps} />
      <DataOutput {...dataOutputProps} />
    </form>
  )
}

export {Calculator}
