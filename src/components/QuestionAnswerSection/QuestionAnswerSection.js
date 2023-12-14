import Question from "../Question";
import LoadingSpinner from "../LoadingSpinner";
import AskQuestion from "../AskQuestion";
import { ErrorAlert } from "../Alert";

import { useAlertOnce } from "../../hooks/useAlert";

import styles from "./QuestionAnswerSection.module.css";

const QuestionAnswerSection = ({
    questions,
    loading,
    error
}) => {
    const { alert, showAlert } = useAlertOnce();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        showAlert(ErrorAlert, error);
    }

    return (
        <>
            {alert}
            <div className={styles["questions-list-container"]}>
                <AskQuestion />
                {questions.map(question =>
                    <Question
                        key={question.id}
                        question={question}
                    />
                )}
            </div>
        </>
    );
};

export default QuestionAnswerSection;
