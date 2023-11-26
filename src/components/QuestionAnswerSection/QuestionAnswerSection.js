import Question from "../Question";

import styles from "./QuestionAnswerSection.module.css";

const QuestionAnswerSection = () => {
    return (
        <div className={styles["questions-list-container"]}>
            <Question />
            <Question />
        </div>
    );
};

export default QuestionAnswerSection;
