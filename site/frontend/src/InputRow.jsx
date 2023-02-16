
import React, { useState, useEffect } from 'react';
import { ForeignKeySelect } from './ForeignKeySelect.jsx';
import { tables } from './data.js';

export function InputRow({title, value, onChange}) {
    return (
        <div className="row align-items-centercol-auto">
            <div className="col-3">
                <label className="col-form-label">{title}</label>
            </div>
            <div className="col">
                <input type="text" className="form-control" value={value} onChange={onChange} />
            </div>
        </div>
    );
}

export function SelectionRow({title, value, pairs, onChange}) {
    return (
        <div className="row align-items-centercol-auto">
            <div className="col-3">
                <label className="col-form-label">{title}</label>
            </div>
            <div className="col">
                <select className="form-control" value={value} onChange={onChange}>
                    {Object.entries(pairs).map(pair => <option value={pair[0]}>{pair[1]}</option>)}
                </select>
            </div>
        </div>
    );
}

export function ForeignKeySelectionRow({title, tableName, searchKeyFunc, foreignKey, onChange}) {
    return (
        <div className="row align-items-centercol-auto">
            <div className="col-3">
                <label className="col-form-label">{title}</label>
            </div>
            <div className="col">
                <ForeignKeySelect tables={tables} tableName={tableName} searchKeyFunc={searchKeyFunc} foreignKey={foreignKey} onChange={onChange} />
            </div>
        </div>
    );
}
