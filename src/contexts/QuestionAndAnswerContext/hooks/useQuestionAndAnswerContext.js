import { useContext } from "react";

import QuestionAndAnswerContext from "../QuestionAndAnswerContext";

import { CONTEXT_NOT_FOUND } from "../../../constants/common";

const useQuestionAndAnswerContext = () => {
    const context = useContext(QuestionAndAnswerContext);
    if (!context) {
        throw new Error(CONTEXT_NOT_FOUND);
    }
    return context;
};

export default useQuestionAndAnswerContext;
