const QUESTIONS_REDUCER_HANDLERS = {
    INITIALIZE_QUESTIONS: (state, questions) => [...questions],
    ADD_QUESTION: (state, question) => [question, ...state],
    LIKE_QUESTION: (state, like) => {
        return state.map(question => {
            if (question.id === like.questionId) {
                question.likes.push(like);
            }
            return question;
        });
    },
};

export const QUESTIONS_ACTION_TYPE = {
    initializeQuestions: "INITIALIZE_QUESTIONS",
    addQuestion: "ADD_QUESTION",
    likeQuestion: "LIKE_QUESTION"
};

export const questionsReducer = (state, action) => {
    const questionsReducerHandler = QUESTIONS_REDUCER_HANDLERS[action.type];
    if (!questionsReducerHandler) {
        return state;
    }
    return questionsReducerHandler(state, action.payload);
};
