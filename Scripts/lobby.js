const passRangeInput = document.querySelector('#passRangeInput');
const passRangeOutput = document.querySelector('#passRangeOutput');

passRangeInput.addEventListener("input", (e) => 
    {
        passRangeOutput.value = e.target.value;
    }
)

const turnRangeInput = document.querySelector('#turnRangeInput');
const turnRangeOutput = document.querySelector('#turnRangeOutput');
turnRangeInput.addEventListener("input", (e) => 
    {
        turnRangeOutput.value = e.target.value;
    }
)
