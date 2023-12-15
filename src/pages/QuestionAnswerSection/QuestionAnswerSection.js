import Question from "../../components/Question";
import LoadingSpinner from "../../components/LoadingSpinner";
import AskQuestion from "../../components/AskQuestion";
import { ErrorAlert } from "../../components/Alert";

import { useAlertOnce } from "../../hooks/useAlert";
import { useQuestionAndAnswerContext } from "../../contexts/QuestionAndAnswerContext";

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

const withQuestionAndAnswerData = (WrapperComponent) => {
    return (props) => {
        const { questions, loading, error } = useQuestionAndAnswerContext();

        return (
            <WrapperComponent
                questions={questions}
                error={error}
                loading={loading}
                {...props}
            />
        );
    };
};

export const QuestionAnswerSectionWithData = withQuestionAndAnswerData(QuestionAnswerSection);

export default QuestionAnswerSection;
