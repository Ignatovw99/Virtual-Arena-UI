import { useQuestionAndAnswerContext } from "../../../contexts/QuestionAndAnswerContext";
import { useRef } from "react";

const useUnreadQuestionsTracker = () => {
    const { questions, loading } = useQuestionAndAnswerContext();
    const readQuestionsCountRef = useRef(null);

    if (!readQuestionsCountRef.current && !loading) {
        readQuestionsCountRef.current = questions.length;
    }

    const markAllQuestionsAsRead = () => {
        if (!readQuestionsCountRef.current || loading) {
            return;
        }
        readQuestionsCountRef.current = questions.length;
    };

    const getUnreadQuestionsCount = () => {
        if (!readQuestionsCountRef.current || loading) {
            return 0;
        }
        return questions.length - readQuestionsCountRef.current;
    };

    return { getUnreadQuestionsCount, markAllQuestionsAsRead };
};

export default useUnreadQuestionsTracker;
