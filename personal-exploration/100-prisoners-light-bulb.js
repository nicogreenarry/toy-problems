'use strict';

/*

 There are 100 prisoners in solitary cells. There's a central living room with one light bulb; this bulb is initially
 off. No prisoner can see the light bulb from his or her own cell. Everyday, the warden picks a prisoner equally at
 random, and that prisoner visits the living room. While there, the prisoner can toggle the bulb if he or she wishes.
 Also, the prisoner has the option of asserting that all 100 prisoners have been to the living room by now. If this
 assertion is false, all 100 prisoners are shot. However, if it is indeed true, all prisoners are set free and inducted
 into MENSA, since the world could always use more smart people. Thus, the assertion should only be made if the prisoner
 is 100% certain of its validity. The prisoners are allowed to get together one night in the courtyard, to discuss a
 plan. What plan should they agree on, so that eventually, someone will make a correct assertion?

 */

// Utils
const range = function(n) {
  return [...Array(n).keys()].map((el, i) => i);
};

const generatePrisonerSequence = function(n) {
  const sequence = [];
  const prisoners = range(n);

  while(prisoners.some(el => (el !== null))) {
    const prisoner = Math.floor(Math.random()*n);
    sequence.push(prisoner);
    prisoners[prisoner] = null;
  }

  return sequence;
};


// Prisoner guessing rules
// Identity function
const identity = (val => val);

// Logical operators
const equals = (state, a, b) => (a === b);
const not = (state, a) => !a;
const and = (state, a, b) => (a && b);
const or = (state, a, b) => (a || b);
const andBoolean = (state, a, b) => Boolean(a && b);
const orBoolean = (state, a, b) => Boolean(a || b);
const xor = (state, a, b) => Boolean((a || b) && !(a && b));

// Day comparisons
const onDayEqualToN = ({day, n}) => (day === (n - 1));
const onEvenDay = state => (state.day % 2 === 0);

// Visits comparisons
const firstVisit = state => state.previousVisits === 0;
const evenVisits = state => (state.previousVisits % 2 === 0);
const evenVisitsButNotFirst = state => ((state.previousVisits % 2 === 0) && state.previousVisits !== 0);

// Light state
const lightIsOn = state => state.light;

// Combination comparisons
const lightOffOnStateMatchesDayEvenOddState = state => (state.light === !(state.day % 2 === 0));


// Execute a strategy and return an action object
const executePrisonerStrategy = function(strategy = {}, state) {
  return {
    setLightTo: false,
    assertFinalPrisoner: state.day === 5 ? true : false,
  };
};


// Tests
const numOfPrisoners = 6;
const numOfTests = 20;
const prisonerSequences = range(numOfTests).map(el => generatePrisonerSequence(numOfPrisoners));

const testOneSequence = function(n, sequence, executePrisonerStrategy) {
  const initialState = {
    light: false,
    haveNotFailedYet: true,
    day: -1,
    previousVisits: false,
    n: n,
  };
  const finalGameState = sequence.reduce((state, prisoner) => {
    state.day++; // Increment the day
    state.previousVisits = sequence.slice(0, state.day).filter(visitor => visitor === prisoner).length;

    if (!state.haveNotFailedYet) { // If they already died, don't progress further
      state.haveNotFailedYet = false;
      return state;
    }

    const action = executePrisonerStrategy({}, state);

    // If a prisoner who isn't the final prisoner asserts that they ARE the final prisoner, then they all die
    if (state.day === (sequence.length-1)) {
      state.haveNotFailedYet = action.assertFinalPrisoner === true;
    } else {
      state.haveNotFailedYet = action.assertFinalPrisoner === false;
    }
    state.light = action.setLightTo;
    return state;
  }, initialState);

  return finalGameState.haveNotFailedYet;
};

const testResults = prisonerSequences.map(sequence => testOneSequence(6, [0,1,2,3,4,5], executePrisonerStrategy));
console.log(testResults);