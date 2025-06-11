import React from 'react';

const Loading = ({ is_invisible, theme, id }) => (
    <div id={id} className={`initial-loader__barspinner barspinner barspinner-light${is_invisible ? ' invisible' : ''}`}>
        <div className="initial-loader__barspinner--rect barspinner__rect barspinner__rect--1 rect1" />
        <div className="initial-loader__barspinner--rect barspinner__rect barspinner__rect--2 rect2" />
        <div className="initial-loader__barspinner--rect barspinner__rect barspinner__rect--3 rect3" />
        <div className="initial-loader__barspinner--rect barspinner__rect barspinner__rect--4 rect4" />
        <div className="initial-loader__barspinner--rect barspinner__rect barspinner__rect--5 rect5" />
    </div>
);

export default Loading;
