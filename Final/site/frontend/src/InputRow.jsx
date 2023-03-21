
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
                <select className="form-control" value={value} onChange={e => onChange(e)}>
                    <option value="" hidden>-- select option --</option>
                    {Object.entries(pairs).map(pair => <option value={pair[0]}>{pair[1]}</option>)}
                </select>
            </div>
        </div>
    );
}

export function ForeignKeySelectionRow({title, value, tableName, searchKeyFunc, foreignKey, onChange, additionalFields}) {
    return (
        <div className="row align-items-centercol-auto">
            <div className="col-3">
                <label className="col-form-label">{title}</label>
            </div>
            <div className="col">
                <ForeignKeySelect tables={tables} value={value} tableName={tableName} searchKeyFunc={searchKeyFunc} foreignKey={foreignKey} additionalFields={additionalFields} onChange={onChange} />
            </div>
        </div>
    );
}
