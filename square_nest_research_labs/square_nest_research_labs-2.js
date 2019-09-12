/*
Function returns whole word if index located inside it and part of the word if index is before first whitespace or function gets word as a first argument
*/

const testText_1 = '   Several drinks make me like a mad monkey!   ';
const testText_2 = ' theory ';

// RegExp for normalization (trims starting and ending spaces)
const regExpSpaces = /^\s{1,}|\s{1,}$/g;

const getFragment = (text, index) => {
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

  // validation
  if (text.length < 2) {
    return 'Text must consist of 2 or more symbols.';
  } else if ( typeof(index) !== 'number' ) {
    return 'The 2nd argument (index) must be an integer number.';
  } else if ( Number.isInteger(index) === false ) {
    return 'The 2nd argument (index) must be only an integer number!';
  } else if (index < 0) {
    return 'Index must be more than or equal to null.';
  } else {
    validity = true;
  }

  if (validity === true) {
    // finds first space (after 1st word)
    let firstSpaceIndex = text.indexOf(' ');
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
      } else if (text[index] !== ' ' && index < firstSpaceIndex) {
        // case: index of last symbol before first whitespace
        if (text[index + 1] === ' ') {
          return text[index];
        }

        index = index + 1;
        nextSpaceIndex = text.indexOf(' ', index);
        return text.substring(index, nextSpaceIndex);
      } else {
        index = index + 1;
        nextSpaceIndex = text.indexOf(' ', index);
        return text.substring(index, nextSpaceIndex);
      }
    // 'text' is a word
    } else {
      let lastSymIndex = text.length - 1;

      if (index === lastSymIndex) {
        return text[index];
      } else {
        index = index + 1;
        return text.substring(index);
      }
    }

    if (serviceIndex > 0) {
      return text.substring(serviceIndex, nextSpaceIndex);
    }
  }
};

///////////////////////////////////
// TEST CASES //
//getFragment(testText_1, 7);

//getFragment(testText_2, 2);

//getFragment('   Several drinks make me like a mad monkey!   ', 10);

/*
getFragment(`Forest Gamp likes sweets.
But he also likes to eat meat and vegetables.
It's cool! `, 14);
*/

// last index
//getFragment('Serenity', 7);

//getFragment('Some things make me no serious a little...', 4.57);

//getFragment(0.7000, 4);
