$(function() {
    const errObject = {
        textLengthLessThan2: 'Text must consist of 2 or more symbols.',
        numberNotInteger: 'The 2nd argument (index) must be only an integer number!',
        indexLessThanNull: 'Index must be more than or equal to null.',
        indexMoreThanLastSymIndex: 'Index must be less than or equal to index of the last symbol: ',
    };

    const positionInput = $('#position');
    const getFragmentBtn = $('.get-fragment-btn');
    const textArea = $('#text');
    const resultArea = $('#result');
    const stubText = `Ingate – крупнейший Digital Marketing Integrator, который работает, чтобы бизнес во всём мире БЫСТРЕЕ находил себе клиентов.
    Компания основана в 2000 году, насчитывает более 700 сотрудников. Успешно реализовала более 7000 проектов с известными российскими и международными брендами.
    Основной вектор развития Ingate — скорость. Быть самой быстрой на рынке компании помогают основные ценности: ЭКСПЕРТИЗА, ЗАБОТА И ТЕХНОЛОГИИ, которые ведут к высокой скорости любых процессов.`;

    textArea.val(stubText);

    // RegExp for normalization (trims starting and ending spaces and deletes spacing symbols inside string if their amount is more than one)
    const regExpSpaces1 = /^\s{1,}|\s{1,}$/g;
    const regExpSpaces2 = /\s{2,}/g;

    // normalizing function (simple)
    const normalizeString = (str) => {
        str = str.replace(regExpSpaces1, '');
        str = str.replace(regExpSpaces2, ' ');
        return str;
    };

    // initial values
    let textAreaVal = '';
    let result = '';
    let positionInputVal, serviceIndex, lastSymIndex = 0;
    let firstSpaceIndex, nextSpaceIndex, lastSpaceIndex = 0;
    let validity = false;

    // small ui features
    positionInput.on('input', function() {
        getFragmentBtn.attr('disabled', false);
        // deletes former result in result's textarea
        if ( resultArea.val().length > 0 ) {
            resultArea.val('');
        }
    });

    positionInput.on('blur', function() {
        if ( positionInput.val() === '' ) {
            getFragmentBtn.attr('disabled', true);
        }
    });

    // main function
    getFragmentBtn.on('click', function() {
        // cleaning
        if ( resultArea.val().length > 0 ) {
            resultArea.val('');
        }

        result = '';
        positionInputVal, serviceIndex, lastSymIndex = 0;
        firstSpaceIndex, nextSpaceIndex, lastSpaceIndex = 0;

        // gets current text
        textAreaVal = textArea.val();

        // normalizes
        textAreaVal = normalizeString(textAreaVal);

        // gets the index of the last symbol after normalization
        lastSymIndex = textAreaVal.length - 1;

        // gets current index
        positionInputVal = positionInput.val();
        positionInputVal = Number(positionInputVal);

        // validation
        if (textAreaVal.length < 2) {
            alert(errObject.textLengthLessThan2);
            return false;
        } else if ( Number.isInteger(positionInputVal) === false ) {
            alert(errObject.numberNotInteger);
            return false;
        } else if (positionInputVal < 0) {
            alert(errObject.indexLessThanNull);
            return false;
        } else if (positionInputVal > lastSymIndex) {
            alert(`${errObject.indexMoreThanLastSymIndex}${lastSymIndex}`);
            return false;
        } else {
            validity = true;
        }

        if (validity === true) {
            // finds first space (after 1st word)
            firstSpaceIndex = textAreaVal.indexOf(' ');

            // 'text' is sentence
            if (firstSpaceIndex !== -1) {
                // finds last space index
                for (let i = lastSymIndex; i > firstSpaceIndex; --i) {
                    //console.log(i); // test
                    if (textAreaVal[i] === ' ') {
                        lastSpaceIndex = i;
                    }
                }
                console.log(`last space index: ${lastSpaceIndex}`); // test

                if (textAreaVal[positionInputVal] !== ' ' && positionInputVal > firstSpaceIndex) {
                    nextSpaceIndex = textAreaVal.indexOf(' ', positionInputVal);

                    let i = positionInputVal;

                    while (textAreaVal[i] !== ' ') {
                        i--;
                    }

                    // gets all on the right of whitespace
                    serviceIndex = i + 1;

                    // the end of sentence
                    if (nextSpaceIndex === -1) {
                        nextSpaceIndex = lastSymIndex + 1; // check!
                    }

                    // word before last space
                    /* for (let i = lastSymIndex; i > positionInputVal; --i) {
                        if (textAreaVal[i] === ' ') {
                            lastSpaceIndex = i;
                        }
                    } */

                    if (positionInputVal + 1 === lastSpaceIndex) {
                        nextSpaceIndex = lastSpaceIndex;
                    }
                } else if (textAreaVal[positionInputVal] !== ' ' && positionInputVal < firstSpaceIndex) {
                    // case: index of last symbol before first whitespace
                    if (positionInputVal + 1 === firstSpaceIndex) {
                        result = textAreaVal[positionInputVal];
                        console.log(`1: ${result}`); // test
                    } else {
                        positionInputVal = positionInputVal + 1;
                        nextSpaceIndex = firstSpaceIndex;
                        result = textAreaVal.substring(positionInputVal, nextSpaceIndex);
                        console.log(`2: ${result}`); // test
                    }
                } else {
                    if (textAreaVal[positionInputVal] === ' ' && positionInputVal >= firstSpaceIndex) {
                        if (positionInputVal === lastSpaceIndex) {
                            result = textAreaVal.substring(positionInputVal + 1, lastSymIndex + 1); // check!
                            console.log(`3: ${result}`); // test
                        } else {
                            positionInputVal = positionInputVal + 1;
                            nextSpaceIndex = textAreaVal.indexOf(' ', positionInputVal);
                            result = textAreaVal.substring(positionInputVal, nextSpaceIndex);
                            console.log(`4: ${result}`); // test
                        }
                    }
                }
            } else {
                // 'text' is a word
                if (positionInputVal === lastSymIndex) {
                    result = textAreaVal[positionInputVal];
                    console.log(`5: ${result}`); // test
                } else {
                    positionInputVal = positionInputVal + 1;
                    result = textAreaVal.substring(positionInputVal);
                    console.log(`6: ${result}`); // test
                }
            }

            if (textAreaVal[positionInputVal] !== ' ' && serviceIndex > 0) {
                result = textAreaVal.substring(serviceIndex, nextSpaceIndex);
                console.log(`7: ${result}`); // test
            }
        }

        resultArea.val(result);
        console.log(`Fin: ${result}`); // test
    });
});
