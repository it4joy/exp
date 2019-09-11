$(function() {
  const positionInput = $('#position');
  const getFragmentBtn = $('.get-fragment-btn');
  const textArea = $('#text');
  const resultArea = $('#result');
  const stubText = `Ingate – крупнейший Digital Marketing Integrator, который работает, чтобы бизнес во всём мире БЫСТРЕЕ находил себе клиентов.
Компания основана в 2000 году, насчитывает более 700 сотрудников. Успешно реализовала более 7000 проектов с известными российскими и международными брендами.
Основной вектор развития Ingate — скорость. Быть самой быстрой на рынке компании помогают основные ценности: ЭКСПЕРТИЗА, ЗАБОТА И ТЕХНОЛОГИИ, которые ведут к высокой скорости любых процессов.`;
  
  textArea.val(stubText);
  
  // RegExp for normalization (trims starting and ending spaces)
  const regExpSpaces = /^\s{1,}|\s{1,}$/g;
  
  // initial values
  let positionInputVal = '';
  let textAreaVal = '';
  let result = '';
  let serviceIndex = 0;
  let validity = false;
  
  // small ui features
  positionInput.on('input', function() {
    getFragmentBtn.attr('disabled', false);
    // deletes former result
    if ( resultArea.val().length > 0 ) {
      resultArea.val('');
      result = '';
    }
  });
  
  positionInput.on('blur', function() {
    if ( positionInput.val() === '' ) {
      getFragmentBtn.attr('disabled', true);
    }
  });
  
  getFragmentBtn.on('click', function() {
    // gets current text
    textAreaVal = textArea.val();
    
    if ( typeof(textAreaVal) === 'string' ) {
      textAreaVal = textAreaVal.replace(regExpSpaces, '');
    } else {
      alert('The 1st argument must be a string.');
    }
    
    // index of the last symbol after normalization
    const lastSymIndex = textAreaVal.length - 1;
    
    // gets current index
    positionInputVal = positionInput.val();
    positionInputVal = Number(positionInputVal);
    
    // validation
    if (textAreaVal.length < 2) {
      alert('Text must consist of 2 or more symbols.');
      return false;
    } else if ( typeof(positionInputVal) !== 'number' ) {
      alert('The 2nd argument (index) must be an integer number.');
      return false;
    } else if ( Number.isInteger(positionInputVal) === false ) {
      alert('The 2nd argument (index) must be only an integer number!');
      return false;
    } else if (positionInputVal < 0) {
      alert('Index must be more than or equal to null.');
      return false;
    } else if (positionInputVal > lastSymIndex) {
      alert(`Index must be less than or equal to index of the last symbol: ${lastSymIndex}.`);
      return false;
    } else {
      validity = true;
    }
    
    if (validity === true) {
      // finds first space (after 1st word)
      let firstSpaceIndex = textAreaVal.indexOf(' ');
    
      if (firstSpaceIndex !== -1) {
        if (textAreaVal[positionInputVal] !== ' ' && positionInputVal >= firstSpaceIndex) {
          let i = positionInputVal;

          while (textAreaVal[i] !== ' ') {
            i--;
          }

          // gets all on the right of whitespace
          serviceIndex = i + 1; // test it (case with index '11')
        }
      }

      if (serviceIndex > 0) {
        for (let i = serviceIndex; i <= lastSymIndex; ++i) {
          result += textAreaVal[i];
        }
      } else {
        for (let i = positionInputVal + 1; i <= lastSymIndex; ++i) {
          result += textAreaVal[i];
        }
      }
    }
    
    resultArea.val(result);
  });
});
