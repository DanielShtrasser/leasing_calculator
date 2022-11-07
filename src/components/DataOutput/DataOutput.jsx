import React from "react";
import {
  Spinner,
  Input,
} from '@chakra-ui/react'

import styles from './DataOutput.module.scss'



function DataOutput({
    formattedContractPrice,
    formattedMonthPay,
    isSubmitting
  }) {

  return (
    <div className={styles.dataOutput}>
      <div className={styles.contractPrice}>
        <p className={styles.inputHeader8}>Сумма договора лизинга</p>
          <Input
            name="total_sum"
            value={`${formattedContractPrice} ${'₽'}`}
            readOnly
            focusBorderColor='none'
            borderRadius='16px'
            variant='unstyled'
            size='lg' />
        {/* <input name="total_sum" value={`${formattedContractPrice} ${'₽'}`} readOnly></input> */}
      </div>
      <div className={styles.monthPay}>
        <p className={styles.inputHeader8}>Ежемесячный платеж от</p>
        <Input
            name="monthly_payment_from"
            value={`${formattedMonthPay} ${'₽'}`}
            readOnly
            focusBorderColor='none'
            borderRadius='16px'
            variant='unstyled'
            size='lg' />
        {/* <input name="monthly_payment_from" value={`${formattedMonthPay} ${'₽'}`} readOnly></input> */}
      </div>
      <div>
        <button type="submit" className={styles.submit} disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Оставить заявку"}
        </button>
      </div>
  </div>
  )
}

export {DataOutput}