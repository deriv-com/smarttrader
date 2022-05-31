import React from 'react';
import { getBrandName } from '../brand.config';

const Title = () => (
    <title>{`${it.title ? `${it.L(it.title)} | ` : ''}${it.L('Online trading platform')} | ${getBrandName()}`}</title>
);

export default Title;
