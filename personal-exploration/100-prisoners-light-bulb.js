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
}
console.log(range);

const generatePrisonerSequence = function(n) {
  const sequence = [];
  const prisoners = range(n);

  while(prisoners.some(el => (el !== null))) {
    const prisoner = Math.floor(Math.random()*n);
    sequence.push(prisoner);
    prisoners[prisoner] = null;
  }

  return sequence;
}

// Prisoner guessing rules



// Tests
const numOfPrisoners = 6;
const numOfTests = 20;
const prisonerSequences = range(numOfTests).map(el => generatePrisonerSequence(numOfPrisoners));
