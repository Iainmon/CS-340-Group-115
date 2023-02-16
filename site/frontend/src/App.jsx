import React, { useState, useEffect } from 'react';
import { tables } from './data.js';
import { PharmacistView } from './Pharmacist.jsx';
import { CustomerView } from './Customer.jsx';
import { PrescriptionView } from './Prescription.jsx';
import { MedicationView } from './Medication.jsx';
import { PrescriptionStatusView } from './PrescriptionStatus.jsx';
import {
    Container,
    Nav,
} from 'react-bootstrap';

function BasicExample() {
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export function App (props) {

    for (const table of Object.values(tables)) {
        // console.log(table);
        console.table(table);
    }
    
    return (
        <div className="container App">
            <BasicExample />
            <h1 className="text-center display-1">Pharmacy Database</h1>
            <hr></hr>
            <div className="p-5" >
                <PharmacistView records={tables['pharmacists']} />
                <CustomerView records={tables['customers']} />
                <PrescriptionView records={tables['prescriptions']} />
                <MedicationView records={tables['medications']} />
                <PrescriptionStatusView records={tables['prescription_status']} />
            </div>
        </div>);



}