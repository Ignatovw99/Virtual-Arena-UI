import { useState } from "react"

const useStateConditionally = (value, includeValue) => {
    const [state, setState] = useState(value);
    return includeValue ?
        [state, setState] :
        [undefined, () => { }];
};

export default useStateConditionally;
