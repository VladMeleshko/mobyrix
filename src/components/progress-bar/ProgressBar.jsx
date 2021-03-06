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
                                className={`${style.indexedStep} ${accomplished ? style.accomplished : null} ${(step === (100 / (questionTitles.length + 1) * (index)) - 1) ? style.unaccomplished : null}`}
                            >
                                {accomplished ? '✓' : index}
                            </div>
                            )}
                        </Step>
                    )
                })
            }
            <Step>
                {({ accomplished }) => (
                <div
                    className={`${style.indexedStep} ${accomplished ? style.accomplishedFinalPAge : null}`}
                >
                    {questionTitles.length + 1}
                </div>
                )}
            </Step>
        </ProgressBar>
    );
}