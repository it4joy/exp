///////////////////////////////////////////////////////
// SIGNATURE
/*
fetchFragment :: text (String), index (Number) → String
*/
///////////////////////////////////////////////////////

const testText = `Ingate – крупнейший Digital Marketing Integrator, который работает, чтобы бизнес во всём мире БЫСТРЕЕ находил себе клиентов.
Компания основана в 2000 году, насчитывает более 700 сотрудников. Успешно реализовала более 7000 проектов с известными российскими и международными брендами.
Основной вектор развития Ingate — скорость. Быть самой быстрой на рынке компании помогают основные ценности: ЭКСПЕРТИЗА, ЗАБОТА И ТЕХНОЛОГИИ, которые ведут к высокой скорости любых процессов.`;

// RegExp for normalization (trims starting and ending spaces)
const regExpSpaces = /^\s{1,}|\s{1,}$/g;

// function
const fetchFragment = (text, index) => {
  // initial values
  let result = '';
  let serviceIndex = 0;
  let validity = false;

  // removes spaces from start and end if it's a string
  if ( typeof(text) === 'string' ) {
    text = text.replace(regExpSpaces, '');
  } else {
    return 'The 1st argument must be a string.'
  }
  
  // index of the last symbol after normalization
  const lastSymIndex = text.length - 1;

  // validation
  if (text.length < 2) {
    return 'Text must consist of 2 or more symbols.';
  } else if ( typeof(index) !== 'number' ) {
    return 'The 2nd argument (index) must be an integer number.';
  } else if ( Number.isInteger(index) === false ) {
    return 'The 2nd argument (index) must be only an integer number!';
  } else if (index < 0) {
    return 'Index must be more than or equal to null.';
  } else if (index > lastSymIndex) {
    return `Index must be less than or equal to index of the last symbol: ${lastSymIndex}.`;
  } else {
    validity = true;
  }

  if (validity === true) {
    // finds first space (after 1st word)
    let firstSpaceIndex = text.indexOf(' ');
    
    if (firstSpaceIndex !== -1) {
      if (text[index] !== ' ' && index >= firstSpaceIndex) {
        //console.log('not a space'); // test
        let i = index;

        while (text[i] !== ' ') {
          i--;
        }

        // gets all on the right of whitespace
        serviceIndex = i + 1;
      }
    }

    if (serviceIndex > 0) {
      for (let i = serviceIndex; i <= lastSymIndex; ++i) {
        result += text[i];
      }
    } else {
      let i = 0;
      
      if (index === lastSymIndex) {
        i = index;
      } else {
        i = index + 1;
      }
      // gets fragment starting of the right of index (if index !== lastSymIndex) and directly starting from index in another case
      for (let k = i; k <= lastSymIndex; ++k) {
        result += text[k];
      }
    }
  }

  return result;
};

/////////////////////////////////////////////////////////
// DEMO CASES
// NOTE: uncomment case for checking how the function works
/////////////////////////////////////////////////////////

// CASE: string with initial and trailing whitespace symbols
//fetchFragment('   Several drinks make me like a mad monkey!   ', 10);


// CASE: text with several lines
/*
fetchFragment(`Forest Gamp likes sweets.
But he also likes to eat meat and vegetables.
It's cool! `, 14);
*/


// CASE: text with several lines without reverse apostrophes
// NOTE: this presents fragment via console in multiline form as example
/*
const res = fetchFragment(' Forest Gamp likes sweets.\nBut he also likes to eat meat and vegetables.\nIt\'s cool!', 21);
console.log(res);
*/

// CASE: one word, last index (index === lastSymIndex)
//fetchFragment('Serenity', 7);


// CASE: big text example
//fetchFragment(testText, 150);


// CASE: float value received as an index
//fetchFragment('Some things make me no serious a little...', 4.57);


// CASE: invalid text data example
//fetchFragment(0.7000, 4);


/////////////////////////////////////////////////
// FEATURES TO-DO (Tmp)
// -case with index '5' - remove spaces after all
// instruction 'return result' may be placed in 'if' statement above
