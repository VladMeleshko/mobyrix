import React from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from 'react-step-progress-bar';
import style from './ProgressBar.module.css';

export const ProgressBarLine = (props) => {
    const { questionTitles, step } = props;

    return (
        <ProgressBar percent={step}  filledBackground="#BBD780" unfilledBackground="rgba(39, 50, 16, 0.6)">
            <Step>
                {({ accomplished }) => (
                <div
                    className={`${style.indexedStep} ${accomplished ? style.accomplished : null}`}
                >
                    ✓
                </div>
                )}
            </Step>
            {
                questionTitles.map((_, index) => {
                    return (
                        <Step key={`question-${index}`}>
                            {({ accomplished, index }) => (
                            <div
                                className={`${style.indexedStep} ${accomplished ? style.accomplished : null}`}
                            >
                                {accomplished ? '✓' : index + 1}
                            </div>
                            )}
                        </Step>
                    )
                })
            }
            <Step>
                {({ accomplished }) => (
                <div
                    className={`${style.indexedStep} ${accomplished ? style.accomplished : null}`}
                >
                    {questionTitles.length + 2}
                </div>
                )}
            </Step>
        </ProgressBar>
    );
}