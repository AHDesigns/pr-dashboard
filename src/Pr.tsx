import React from 'react';
import { pullRequest, uniqueReview } from './types';

const Review: React.FC<uniqueReview> = (review) => {
    return (
        <div className="">
            <p><a href={review.url} target="_blank">REVIEW: onbehalfof: {review.onBehalfOf}</a></p>
            <img src={review.author.avatarUrl} alt={review.author.login} />
        </div>
    )
}

const Pr: React.FC<pullRequest> = (pr) => {
    return (
        <div className="">
            <p><a href={pr.url} target="_blank">{pr.title}</a></p>
            {pr.author && <img src={pr.author.avatarUrl} alt={pr.author.login} />}
            {pr.reviews.state}
            {pr.reviews.uniqueReviews.map(( review: uniqueReview ) => <Review {...review} />)}
        </div>
    );
}

export default Pr;

