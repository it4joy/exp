const testText_1 = '   Several drinks make me like a mad monkey!   ';
const testText_2 = ' theory ';

// RegExp for normalization (trims starting and ending spaces and deletes spacing symbols inside string if their amount is more than one)
const regExpSpaces1 = /^\s{1,}|\s{1,}$/g;
const regExpSpaces2 = /\s{2,}/g;

// normalizing function (simple)
const normalizeString = (str) => {
  str = str.replace(regExpSpaces1, '');
  str = str.replace(regExpSpaces2, ' ');
  return str;
};

// main function
const getFragment = (text, index) => {
  // initial values
  let result = '';
  let serviceIndex = 0;
  let validity = false;

// removes spaces from start and end if it's a string
  if ( typeof(text) === 'string' ) {
    text = normalizeString(text);
  } else {
    return 'The 1st argument must be a string.'
  }

  // gets index of the last symbol after normalization
  const lastSymIndex = text.length - 1;
  console.log(`last symbol index: ${lastSymIndex}`); // test

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
    return `Index must be less than or equal to index of the last symbol: ${lastSymIndex}`;
  } else {
    validity = true;
  }

  if (validity === true) {
    // finds first space (after 1st word)
    let firstSpaceIndex = text.indexOf(' ');
    let lastSpaceIndex = 0;
    let nextSpaceIndex = 0;

    // 'text' is sentence
    if (firstSpaceIndex !== -1) {
      if (text[index] !== ' ' && index > firstSpaceIndex) {
        nextSpaceIndex = text.indexOf(' ', index);

        let i = index;

        while (text[i] !== ' ') {
          i--;
        }

        // gets all on the right of whitespace
        serviceIndex = i + 1;

        // the end of sentence
        if (nextSpaceIndex === -1) {
          nextSpaceIndex = lastSymIndex + 1; // check!
        }

        // word before last space
        for (let i = lastSymIndex; i > index; --i) {
          //console.log(text[i]); // test
          if (text[i] === ' ') {
            lastSpaceIndex = i;
          }
        }
        console.log(`last space index: ${lastSpaceIndex}`); // test

        if (index + 1 === lastSpaceIndex) {
          nextSpaceIndex = lastSpaceIndex;
        }
      } else if (text[index] !== ' ' && index < firstSpaceIndex) {
        // case: index of last symbol before first whitespace
        if (text[index + 1] === ' ') {
          return text[index];
        }

        index = index + 1;
        nextSpaceIndex = text.indexOf(' ', index);
        return text.substring(index, nextSpaceIndex);
      } else {
        // last space (check!)
        if (text[index] === ' ' && index > firstSpaceIndex) {
          for (let i = lastSymIndex; i >= index; --i) {
            if (text[i] === ' ') {
                lastSpaceIndex = i;
            }
          }
          console.log(`index: ${index}`); // test
          console.log(`last space index: ${lastSpaceIndex}`);

          if (index === lastSpaceIndex) {
            return 'last space: ' + text.substring(index + 1, lastSymIndex + 1); // check!
          } else {
            index = index + 1;
            nextSpaceIndex = text.indexOf(' ', index);
            return 'result: ' + text.substring(index, nextSpaceIndex);
          }
        }
      }
    // 'text' is a word (OK)
    } else {
      if (index === lastSymIndex) {
        return text[index];
      } else {
        index = index + 1;
        return text.substring(index);
      }
    }

    if (serviceIndex > 0) {
      //console.log(nextSpaceIndex); // test
      return 'tr: ' + text.substring(serviceIndex, nextSpaceIndex);
    }
  }
};

///////////////////////////////////
// TEST CASES //
//getFragment(testText_1, 7);

//getFragment(testText_2, 2);

// cases(arg 2): 40; 0; 4; 5; 6; 7; 10; 13; 14; 18; 20; 22; 24; 27; 28; 31; 32; 33!; 34; 
//getFragment('   Several drinks make me like a mad monkey!   ', 33);

/*
getFragment(`Forest Gamp likes sweets.
But he also likes to eat meat and vegetables.
It's cool! `, 14);
*/

//getFragment(' something went good   ', 11); // OK
//getFragment(' something went good   ', 8); // OK
//getFragment(' something went good   ', 4); // OK
//getFragment(' something went good   ', 9); // OK
//getFragment(' something went good   ', 13); // OK
// last space
//getFragment(' something went good   ', 14);
// the end of sentence
//getFragment(' something went good   ', 16);

// last index
//getFragment(' Serenity  ', 7);

// index (returns the part from the right of index)
//getFragment(' Serenity  ', 4);

//getFragment('Some things make me no serious a little...', 4.57);

//getFragment(0.7000, 4);

// checking of function 'normalizeString()'
//normalizeString('    Text with  unnecessary whitespaces,  simple      implementation  ');

////////////////////////////////////////////
// FEATURES TO-DO
