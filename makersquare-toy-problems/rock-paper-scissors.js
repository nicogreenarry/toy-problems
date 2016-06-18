// MY REFACTORED ANSWER
// Originally I used three nested for loops. It worked fine, but it was ugly. I was the first of my cohort to submit,
// beaten only by 7 seniors. Even after refactoring to the below, using a recursive function, and some debugging, I was
// still the only one in my cohort to have submitted a correct answer.
function rockPaperPermutation (roundCount) {
  if(0 === roundCount) {return []};

  function addPerms(arr,roundCount){
    var nextPerms = arr.reduce(function(acc,el){
      return acc.concat([el + 'r', el + 'p', el + 's']);
    },[]);

    if(Math.pow(3,roundCount) === nextPerms.length){ // We're done!
      return nextPerms;
    }

    return addPerms(nextPerms,roundCount);
  }

  return addPerms([''],roundCount);
}

// OTHER PEOPLE'S ANSWERS:
// Zak:
t = ['r','p','s'];
rockPaperPermutation = rps = (rc, p = '', o = []) => {
  if(p.length === rc) return !rc ? [] : [...o, p];
  for(var c of t) o = rps(rc, p + c, o);
  return o.length === 1 ? [] : o;
};



