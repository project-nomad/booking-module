import React from 'react';
import styled from 'styled-components';
import Star from './Star';

const ReviewCount = styled.span`
  margin: 5px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: #484848;
`;

const Rating = props => (
  <div>
    <span>
      {props.stars.map((star, index) => <Star fill={star} key={index} />)}
    </span>
    <ReviewCount>{props.totalReviews}</ReviewCount>
  </div>
);

export default Rating;
