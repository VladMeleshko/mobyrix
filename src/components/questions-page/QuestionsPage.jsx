import React, { useState, useReducer } from 'react';
import { Header } from '../header/Header';
import { NavLink } from "react-router-dom";
import { ProgressBarLine } from '../progress-bar/ProgressBar'; 
import style from './QuestionsPage.module.css';
import { json } from '../../json';

const initialState = {
    questionNumber: 2,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_QUESTION':
            return {questionNumber: action.questionNumber};
        case 'PREV_QUESTION':
            return {questionNumber: action.questionNumber};
        default:
            return state;
    }
}

export const QuestionsPage = () => {
    const questionsTitleArr = json.questionsTitleArr;

    const answersArr = json.answersArr;

    const [state, dispatch] = useReducer(reducer, initialState);
    const [answerResults, setAnswerResults] = useState([]);
    const [step, setStep] = useState(Math.floor(100 / (questionsTitleArr.length + 1) - 1));

    const setLink = () => state.questionNumber === 4 ? '/download' : `/questions/${state.questionNumber}`;

    const showNextQuestion = () => {
        if (state.questionNumber + 1 < questionsTitleArr.length + 2) 
            dispatch({type: 'NEXT_QUESTION', questionNumber: state.questionNumber + 1});
    }

    const saveTestResults = (e) => {
        const currentAnswers = answerResults.concat(e.target.innerText);
        setAnswerResults(currentAnswers);
        setStep(Math.floor(100 * state.questionNumber / (questionsTitleArr.length + 1) - 1));
        showNextQuestion();
    }

    const showPrevQuestion = () => {
        if (state.questionNumber - 1 >= 2) 
        dispatch({type: 'PREV_QUESTION', questionNumber: state.questionNumber - 1});
    }
    
    return (
        <main className={style.questionsPage}>
            <Header />
            <div className={style.questionsField}>
                <ProgressBarLine 
                    questionTitles={questionsTitleArr}
                    step={step}
                />
                <div className={style.questionsField__questions}>
                    <h2 className={style.questionsField__questionsTitle}>{questionsTitleArr[state.questionNumber - 2]}</h2>
                    <ul className={style.questionsField__questionsList}>
                        {
                            answersArr[state.questionNumber - 2].map((answer, index) => {
                                return (
                                    <NavLink to={setLink()} key={style.questionsField__questionsAnwer + index}>
                                        <li key={style.questionsField__questionsAnwer + index} className={style.questionsField__questionsAnwer} onClick={(e) => saveTestResults(e)}>
                                            {answer}
                                        </li>
                                    </NavLink>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={style.questionsField__buttons}>
                    <NavLink to={`/questions/${state.questionNumber - 1}`}>
                        <button className={style.questionsField__buttonsBack} onClick={() => showPrevQuestion()}>Back</button>
                    </NavLink>
                    <NavLink to={setLink()}>
                        <button className={style.questionsField__buttonsNext} onClick={() => showNextQuestion()}>Next</button>
                    </NavLink>
                </div>
            </div>
        </main>
    );
}