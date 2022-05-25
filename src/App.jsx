import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { Die } from './components/Die'
import Confetti from 'react-confetti'


export const App = () => {

  const [arrayDice, setArrayDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  /**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 */


  useEffect(() => {

    const isAllHeld = arrayDice.every(dice => dice.isHeld)
    const fisrtValue = arrayDice[0].value
    const isAllSameValue = arrayDice.every(dice => dice.value == fisrtValue)
    if (isAllHeld && isAllSameValue) setTenzies(true), console.log("U won")

    console.log("Dice change!")
  }, [arrayDice])



  function diceGenerator() {
    return { value: Math.floor(Math.random() * 7), isHeld: false, id: nanoid() }
  }

  function allNewDice() {
    const arrayNumber = []
    for (let i = 0; i < 10; i++) {
      arrayNumber.push(diceGenerator())
    }
    return arrayNumber
  }

  function heldDice(id) {
    setArrayDice(preValue =>
      preValue.map(dice => dice.id === id ?
        { ...dice, isHeld: !dice.isHeld } :
        dice))
  }

  function rollDice() {

    if (!tenzies) {
      setArrayDice(preValue => preValue.map(dice => dice.isHeld ? dice :
        diceGenerator()))
    }
    if (tenzies) {
      setArrayDice(allNewDice())
      setTenzies(false)
    }

  }

  const allDices = arrayDice.map(dice => <Die key={dice.id} {...dice} handleClick={heldDice} />)

  return (
    <div className='flex flex-wrap flex-row  space-x-2 m-4 space-y-2'>
      <div></div>
      {tenzies && <Confetti />}
      {allDices}
      <button onClick={rollDice} className='bg-blue-900 border-none rounded-md font-bold w-36 h-16 text-white'>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  )
}
