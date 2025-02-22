/* eslint-disable react/prop-types */
function SkipButton({onSkipCard}){ //BOTTONI PER SKIPPARE LE CARTE
    const skipAudio = new Audio("/assets/skip_button_sfx.mp3");

    return (
        <button id="skipButton" onClick={() => {
            onSkipCard(); //chiama la funzione per skippare la carta gestita in App
            skipAudio.play();
            skipAudio.currentTime = 0;
        }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-forward-fill" viewBox="0 0 16 16">
                <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5"/>
            </svg>
        </button>
    )
}

export default SkipButton;