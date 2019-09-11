///////////////////////////////////////////////////////
// SIGNATURE
/*
fetchFragment :: text (String), index (Number) → String
*/
///////////////////////////////////////////////////////

const testText = `Ingate – крупнейший Digital Marketing Integrator, который работает, чтобы бизнес во всём мире БЫСТРЕЕ находил себе клиентов.
Компания основана в 2000 году, насчитывает более 700 сотрудников. Успешно реализовала более 7000 проектов с известными российскими и международными брендами.
Основной вектор развития Ingate — скорость. Быть самой быстрой на рынке компании помогают основные ценности: ЭКСПЕРТИЗА, ЗАБОТА И ТЕХНОЛОГИИ, которые ведут к высокой скорости любых процессов.`;

// normalization (trims starting and ending spaces)
const regExpSpaces = /^\s{1,}|\s{1,}$/g;

const fetchFragment = (text, index) => {
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
        serviceIndex = i + 1; // test it (case with index '11')
      }
    }

    if (serviceIndex > 0) {
      //console.log('service index > 0'); // test
      for (let i = serviceIndex; i <= lastSymIndex; ++i) {
        result += text[i];
      }
    } else {
      for (let i = index + 1; i <= lastSymIndex; ++i) {
        result += text[i];
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
It's cool!`, 4);
*/


// CASE: text with several lines without reverse apostrophes
// NOTE: this presents fragment via console in multiline form as example
/*
const res = fetchFragment('Forest Gamp likes sweets.\nBut he also likes to eat meat and vegetables.\nIt\'s cool!', 8);
console.log(res);
*/

// CASE: one word
//fetchFragment('Serenity', 2);


// CASE: big text example
//fetchFragment(testText, 457);


// CASE: float value received as an index
//fetchFragment('Some things make me no serious a little...', 4.57);


// CASE: invalid data example
//fetchFragment(0.7000, 0); // test!


/////////////////////////////////////////////////
// FEATURES TO-DO
// -case with index '5' - remove spaces after all