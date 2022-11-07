import React, { useState } from "react";
import {
  Input,
  InputRightElement,
  InputGroup,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

import styles from './DataInput.module.scss'

function DataInput({
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
}) {
  const [hoverForPriceSlider, setHoverForPriceSlider] = useState(false)
  const [hoverForInitialSlider, setHoverForInitialSlider] = useState(false)
  const [hoverForMonthSlider, setHoverForMonthSlider] = useState(false)

  const priceEventHandler = (e, callback) => {
    e.preventDefault()
    const data = e.target.value.replace(/\s+/g, '')
    callback(data)
  }

  const initialEventHadler = (e, callback) => {
    e.preventDefault()
    const data = e.target.value.replace(/\D/g, '')
    console.log('datd ', data);
    const persentage = Math.trunc(data / (price / 100))
    console.log('persentage ', persentage);
    setInitial(persentage)
    callback(data)
  }

  return (
    <div className={styles.dataInput}>
      <div className={styles.dataInputBlock}>
        <Text mb='8px'>Стоимость автомобиля</Text>
        <InputGroup size='lg'>
          <Input
            value={formattedPrice}
            onChange={(e) => priceEventHandler(e, setPrice)}
            disabled={isSubmitting}
            focusBorderColor='none'
            borderRadius='16px'
            onMouseEnter={() => setHoverForPriceSlider(true)}
            onMouseLeave={() => setHoverForPriceSlider(false)} />
          <InputRightElement children='₽' className={styles.inputRightElementPrice} />
        </InputGroup>
        <Slider
          defaultValue={1000000}
          min={1000000}
          max={6000000}
          disabled={isSubmitting}
          className={styles.slider}
          onChange={setPrice}
          top='-10px'
          margin='auto'
          width='calc(100% - 48px)'
          paddingTop='10px !important'
          paddingBottom='10px !important' >
          <SliderTrack bg='#E1E1E1' height={hoverForPriceSlider ? '1px' : '2px'}>
            <SliderFilledTrack bg='#ff9514' />
          </SliderTrack>
          <SliderThumb bg='#ff9514' boxSize={hoverForPriceSlider ? 5 : 4} />
        </Slider>
      </div>
      <div className={styles.dataInputBlock}>
        <Text mb='8px'>Первоначальный взнос</Text>
        <InputGroup size='lg'>
          <Input
            value={`${formattedInitialInMoney} ${'₽'}`}
            onChange={e => initialEventHadler(e, setInitialInMoney)}
            disabled={isSubmitting}
            focusBorderColor='none'
            borderRadius='16px'
            onMouseEnter={() => setHoverForInitialSlider(true)}
            onMouseLeave={() => setHoverForInitialSlider(false)} />
          <InputRightElement children={`${initial}%`} className={styles.inputRightElementInitial} />
        </InputGroup>
        <Slider
          defaultValue={1}
          min={10}
          max={60}
          disabled={isSubmitting}
          className={styles.slider}
          onChange={setInitial}
          top='-10px'
          margin='auto'
          width='calc(100% - 48px)'
          paddingTop='10px !important'
          paddingBottom='10px !important' >
          <SliderTrack bg='#E1E1E1' height={hoverForInitialSlider ? '1px' : '2px'}>
            <SliderFilledTrack bg='#ff9514' />
          </SliderTrack>
          <SliderThumb bg='#ff9514' boxSize={hoverForInitialSlider ? 5 : 4} />
        </Slider>
      </div>
      <div className={styles.dataInputBlock}>
        <Text mb='8px'>Срок лизинга</Text>
       <InputGroup size='lg'>
          <Input
            value={monthsAmount}
            onChange={e => setMonthsAmount(e.target.value)}
            disabled={isSubmitting}
            focusBorderColor='none'
            borderRadius='16px'
            onMouseEnter={() => setHoverForMonthSlider(true)}
            onMouseLeave={() => setHoverForMonthSlider(false)} />
          <InputRightElement children='мес.' className={styles.inputRightElementMonth} />
        </InputGroup>
        <Slider
          defaultValue={1}
          min={1}
          max={60}
          disabled={isSubmitting}
          className={styles.slider}
          onChange={setMonthsAmount}
          top='-10px'
          margin='auto'
          width='calc(100% - 48px)'
          paddingTop='10px !important'
          paddingBottom='10px !important' >
          <SliderTrack bg='#E1E1E1' height={hoverForMonthSlider ? '1px' : '2px'}>
            <SliderFilledTrack bg='#ff9514' />
          </SliderTrack>
          <SliderThumb bg='#ff9514' boxSize={hoverForMonthSlider ? 5 : 4} />
        </Slider>
      </div>
    </div>
  )
}

export {DataInput}
