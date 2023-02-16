const rawData = `
[
    {"type":"header","version":"5.2.0-1.el7.remi","comment":"Export to JSON plugin for PHPMyAdmin"},
    {"type":"database","name":"cs340_moncrief"},
    {"type":"table","name":"customers","database":"cs340_moncrief","data":
    [
    {"customer_id":"1","first_name":"Sarah","last_name":"Johnson","address":"111 Main St","phone_number":"555-555-1215"},
    {"customer_id":"2","first_name":"Michael","last_name":"Smith","address":"222 Elm St","phone_number":"555-555-1216"},
    {"customer_id":"3","first_name":"Emily","last_name":"Brown","address":"333 Oak St","phone_number":"555-555-1217"},
    {"customer_id":"4","first_name":"William","last_name":"Jones","address":"444 Main St","phone_number":"555-555-1218"},
    {"customer_id":"5","first_name":"Ashley","last_name":"Miller","address":"555 Elm St","phone_number":"555-555-1219"},
    {"customer_id":"6","first_name":"David","last_name":"Davis","address":"666 Oak St","phone_number":"555-555-1220"},
    {"customer_id":"7","first_name":"Bob","last_name":"Johnson","address":"420 Balze St","phone_number":"555-555-2222"}
    ]
    }
    ,{"type":"table","name":"diagnostic","database":"cs340_moncrief","data":
    [
    {"id":"1","text":"MySQL is working!"}
    ]
    }
    ,{"type":"table","name":"medications","database":"cs340_moncrief","data":
    [
    {"medication_id":"1","name":"Aspirin","description":"Pain reliever","quantity":"100mg","stock":"200","drug_class":"NSAID"},
    {"medication_id":"2","name":"Amoxicillin","description":"Antibiotic","quantity":"250mg","stock":"150","drug_class":"Penicillin"},
    {"medication_id":"3","name":"Ibuprofen","description":"Pain reliever","quantity":"200mg","stock":"100","drug_class":"NSAID"},
    {"medication_id":"4","name":"Acetaminophen","description":"Pain reliever","quantity":"325mg","stock":"200","drug_class":"NSAID"},
    {"medication_id":"5","name":"Penicillin","description":"Antibiotic","quantity":"500mg","stock":"250","drug_class":"Penicillin"},
    {"medication_id":"6","name":"Naproxen","description":"Pain reliever","quantity":"500mg","stock":"150","drug_class":"NSAID"}
    ]
    }
    ,{"type":"table","name":"pharmacists","database":"cs340_moncrief","data":
    [
    {"pharmacist_id":"1","job_title":"Pharmacist","first_name":"John","last_name":"Doe","address":"123 Main St","phone_number":"555-555-1212"},
    {"pharmacist_id":"2","job_title":"Pharmacist","first_name":"Jane","last_name":"Doe","address":"456 Elm St","phone_number":"555-555-1213"},
    {"pharmacist_id":"3","job_title":"Pharmacist","first_name":"Jim","last_name":"Smith","address":"789 Oak St","phone_number":"555-555-1214"},
    {"pharmacist_id":"4","job_title":"Pharmacist","first_name":"James","last_name":"Johnson","address":"111 Elm St","phone_number":"555-555-1215"},
    {"pharmacist_id":"5","job_title":"Pharmacist","first_name":"Jennifer","last_name":"Brown","address":"222 Main St","phone_number":"555-555-1216"},
    {"pharmacist_id":"6","job_title":"Pharmacist","first_name":"Jessica","last_name":"Davis","address":"333 Oak St","phone_number":"555-555-1217"}
    ]
    }
    ,{"type":"table","name":"prescriptions","database":"cs340_moncrief","data":
    [
    {"prescription_id":"1","customer_id":"1","medication_id":"1","dosage":"2.00","refil_count":"3","refil_frequency":"7"},
    {"prescription_id":"2","customer_id":"2","medication_id":"2","dosage":"3.00","refil_count":"2","refil_frequency":"14"},
    {"prescription_id":"3","customer_id":"3","medication_id":"3","dosage":"1.00","refil_count":"5","refil_frequency":"30"},
    {"prescription_id":"4","customer_id":"4","medication_id":"5","dosage":"99.99","refil_count":"2","refil_frequency":"30"},
    {"prescription_id":"5","customer_id":"5","medication_id":"3","dosage":"99.99","refil_count":"3","refil_frequency":"45"},
    {"prescription_id":"6","customer_id":"6","medication_id":"2","dosage":"99.99","refil_count":"0","refil_frequency":"0"},
    {"prescription_id":"7","customer_id":"7","medication_id":"4","dosage":"5.00","refil_count":"1","refil_frequency":"60"}
    ]
    }
    ,{"type":"table","name":"prescription_status","database":"cs340_moncrief","data":
    [
    {"prescription_id":"7","pharmacist_id":"1","status":"filled","update_date":"2023-02-09 17:52:29"},
    {"prescription_id":"3","pharmacist_id":"2","status":"waiting_pickup","update_date":"2023-02-09 17:52:29"},
    {"prescription_id":"5","pharmacist_id":"3","status":"pending","update_date":"2023-02-09 17:52:29"},
    {"prescription_id":"2","pharmacist_id":"4","status":"filled","update_date":"2023-02-09 17:52:29"},
    {"prescription_id":"2","pharmacist_id":"2","status":"dropped_off","update_date":"2023-02-09 17:52:29"},
    {"prescription_id":"7","pharmacist_id":"4","status":"filled","update_date":"2023-02-09 17:52:29"}
    ]
    }
    ]
`;


const parsed = JSON.parse(rawData);
export const tables = {};

for (const d of parsed) {
    if (d['type'] === 'table') {
        if (d['name'] === 'diagnostic') { continue; }
        tables[d['name']] = d['data'].map(r => ({...r}));
    }
}
