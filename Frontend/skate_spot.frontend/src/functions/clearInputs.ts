
const useClearInputs = (setStateFunctions: Array<React.Dispatch<React.SetStateAction<string>>>) =>
    setStateFunctions.forEach(setState => setState(""))