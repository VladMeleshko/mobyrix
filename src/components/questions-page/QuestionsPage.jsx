import React, { useState, useReducer } from 'react';
import { Header } from '../header/Header';
import { NavLink } from "react-router-dom";
import { ProgressBarLine } from '../progress-bar/ProgressBar'; 
import style from './QuestionsPage.module.css';
import { json } from '../../json';

const initialState = {
    questionNumber: 1,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'NEXT_QUESTION':
            return {questionNumber: state.questionNumber + 1};
        case 'PREV_QUESTION':
            return {questionNumber: state.questionNumber - 1};
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

    const setNextLink = () => state.questionNumber === 3 ? '/download' : `/questions/${state.questionNumber + 1}`;

    const setPrevLink = () => state.questionNumber === 1 ? '/' : `/questions/${state.questionNumber - 1}`;

    const showNextQuestion = () => {
        if (state.questionNumber + 1 < questionsTitleArr.length + 1) 
            dispatch({type: 'NEXT_QUESTION'});
    }

    const saveTestResults = (e) => {
        const currentAnswers = answerResults.concat(e.target.innerText);
        setAnswerResults(currentAnswers);
        setStep(Math.floor(100 * (state.questionNumber + 1) / (questionsTitleArr.length + 1) - 1));
        showNextQuestion();
    }

    const showPrevQuestion = () => {
        if (state.questionNumber - 1 >= 1) 
        dispatch({type: 'PREV_QUESTION'});
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
                    <h2 className={style.questionsField__questionsTitle}>{questionsTitleArr[state.questionNumber - 1]}</h2>
                    <ul className={style.questionsField__questionsList}>
                        {
                            answersArr[state.questionNumber - 1].map((answer, index) => {
                                return (
                                    <NavLink to={setNextLink()} key={style.questionsField__questionsAnwer + index}>
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
                    <NavLink to={setPrevLink()}>
                        <button className={style.questionsField__buttonsBack} onClick={() => showPrevQuestion()}>Back</button>
                    </NavLink>
                    <NavLink to={setNextLink()}>
                        <button className={style.questionsField__buttonsNext} onClick={() => showNextQuestion()}>Next</button>
                    </NavLink>
                </div>
            </div>
        </main>
    );
}