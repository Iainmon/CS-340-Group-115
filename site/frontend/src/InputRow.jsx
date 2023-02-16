
import React, { useState, useEffect } from 'react';

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
