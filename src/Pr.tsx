import React from 'react';
import { pullRequest, uniqueReview } from './types';

const Img: React.FC<{ author: { avatarUrl: string, login: string }, cssClassNames?: string }> = ({ author, cssClassNames }) => {
    return (
        <span className="tooltip">
            <img
                className={cssClassNames}
                src={author.avatarUrl}
                alt={author.login}
            />
            <div className="tooltip-hover">{author.login}</div>
        </span>
    )
};

const Review: React.FC<uniqueReview> = (review) => {
    return (
        <div className={`review state--${review.state}`}>
            <a href={review.url} target="_blank" rel="noopener noreferrer" >
                {review.onBehalfOf
                    ? <>
                        <Img author={review.onBehalfOf} cssClassNames="review-image" />
                        <Img
                            author={review.author}
                            cssClassNames="reviewer-team-image"
                        />
                    </>
                    : <Img author={review.author} cssClassNames="review-image" />
                }
            </a>
        </div>
    )
};

const Pr: React.FC<pullRequest> = (pr) => {
    return (
        <div className={`pr failed-ci--${pr.isFailing} state--${pr.reviews.state}`}>
            {pr.author && <Img author={pr.author} cssClassNames="pr-image" />}
            <div className="pr-title">
                <a href={pr.url} target="_blank" rel="noopener noreferrer">
                    {pr.title}
                </a>
            </div>
            
            <p className="pr-reviews">
                {pr.reviews.uniqueReviews.map((review: uniqueReview) => <Review {...review} />)}
            </p>
        </div>
    );
};

export default Pr;

