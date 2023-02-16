import React, { useState, useEffect } from 'react';
import { tables } from './data.js';
import { PharmacistView } from './Pharmacist.jsx';
import { CustomerView } from './Customer.jsx';
import { PrescriptionView } from './Prescription.jsx';
import { MedicationView } from './Medication.jsx';
import { PrescriptionStatusView } from './PrescriptionStatus.jsx';


export function App (props) {

    for (const table of Object.values(tables)) {
        // console.log(table);
        console.table(table);
    }
    
    return <div className="container App">
        <h1>This is the {props.name} view. </h1>
        <PharmacistView records={tables['pharmacists']} />
        <CustomerView records={tables['customers']} />
        <PrescriptionView records={tables['prescriptions']} />
        <MedicationView records={tables['medications']} />
        <PrescriptionStatusView records={tables['prescription_status']} />
        </div>;



}