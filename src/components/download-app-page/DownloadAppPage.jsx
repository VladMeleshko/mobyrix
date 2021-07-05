import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './DownloadAppPage.module.css';
import { Header } from '../header/Header';
import { ProgressBarLine } from '../progress-bar/ProgressBar';
import { json, comments } from '../../json';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import scanner from '../../img/download-page-icons/Scanner.png';
import health from '../../img/download-page-icons/Health.png';
import list from '../../img/download-page-icons/List.png';
import plant from '../../img/download-page-icons/Plant.png';

export const DownloadAppPage = () => {
    const links = {
        link1: {
            img: scanner,
            text: 'Identify 99% of the world\'s plants & trees',
        },
        link2: {
            img: health,
            text: 'Diagnose your plant’s health',
        },
        link3: {
            img: list,
            text: 'Daily tasks to take care of the plant',
        },
        link4: {
            img: plant,
            text: 'Grow tips',
        }
    }

    const [authorsArr, setAuthorsArr] = useState([]);

    useEffect(() => {
        const authors = [];
        for (let author in comments) {
            if (comments.hasOwnProperty(author)) {
                authors.push(author)
            }
        }
        setAuthorsArr(authors);
    }, [])

    return (
        <main className={style.downloadAppPage}>
            <Header />
            <div className={style.downloadAppPage__info}>
                <ProgressBarLine 
                    questionTitles={json.questionsTitleArr} 
                    step={100}
                />
                <h1 className={style.downloadAppPage__infoTitle}>Let’s make the planet green again!</h1>
                <ul className={style.downloadAppPage__infoLinksList}>
                    {
                        [0, 1, 2, 3].map((_, index) => {
                            return (
                                <NavLink to='#' key={`link${index + 1}`}>
                                    <li className={style.infoLinksList__link}>
                                        <img className={style.infoLinksList__linkImg} src={links[`link${index + 1}`].img} alt={`icon${index + 1}`} />
                                        <p className={style.infoLinksList__linkText}>{links[`link${index + 1}`].text}</p>
                                    </li>
                                </NavLink>
                            );
                        })                            
                    }
                </ul>
            </div>
            <div className={style.downloadAppPage__commentsCarousel}>
                <Carousel
                    axis='horizontal'
                    showThumbs={false}
                    showStatus={false}
                    transitionTime={1000}
                    showIndicators={false}
                    centerMode={true}
                    centerSlidePercentage={33}
                    infiniteLoop={true}
                    width={'100%'}
                >
                    {
                        authorsArr.map(author => {
                            return (
                                <div className={style.commentsCarousel__comment} key={`${author}`}>
                                    <div className={style.author__starMark}>
                                        {
                                            [1, 2, 3, 4, 5].map(item => {
                                                if (+comments[`${author}`].stars - item >= 0) {
                                                    return (
                                                        <div key={`star${item}`} className={style.starMark__star + ' ' + style.marked}></div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={`star${item}`} className={style.starMark__star + ' ' + style.unmarked}></div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                    <div className={style.author__comment}>{comments[`${author}`].comment}</div>
                                    <div className={style.author__info}>
                                        <img className={style.author__photo} src={comments[`${author}`].photo} alt={`${author}`} />
                                        <p className={style.author__name}>{comments[`${author}`].name}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </Carousel>
            </div>
            <div className={style.downloadAppPage__downloadAndInfoLinks}>
                <button className={style.downloadAndInfoLinks__downloadButton}>
                    Continue to the App
                </button>
                <div className={style.downloadAndInfoLinks__InfoLinks}>
                    <NavLink to='#'>
                        <p className={style.InfoLinks__teamInfo}>Terms of use</p>
                    </NavLink>
                    <hr />
                    <NavLink to='#'>
                        <p className={style.InfoLinks__policyInfo}>Privacy Policy</p>
                    </NavLink>
                </div>
            </div>
        </main>
    );
}