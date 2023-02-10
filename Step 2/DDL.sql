SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


-- Create pharmacists table

drop table if exists pharmacists;

create or replace table pharmacists (
    pharmacist_id int(11) not null unique AUTO_INCREMENT,
    job_title varchar(255),
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    address varchar(255),
    phone_number varchar(255) not null,
    primary key (pharmacist_id)
);




-- Create customers table

drop table if exists customers;

create or replace table customers (
    customer_id int(11) not null unique AUTO_INCREMENT,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    address varchar(255),
    phone_number varchar(255) not null,
    primary key (customer_id)
);



-- Create medications table

drop table if exists medications;

create or replace table medications (
    medication_id int(11) not null unique AUTO_INCREMENT,
    name varchar(255) not null,
    description varchar(255),
    quantity varchar(255) not null,                   -- Ex: 100mg, 1 tablet, 1 bottle
    stock int not null,
    drug_class varchar(255),
    primary key (medication_id)
);


-- Create prescriptions table

drop table if exists prescriptions;

create or replace table prescriptions (
    prescription_id int(11) not null unique AUTO_INCREMENT,
    customer_id int(11) not null,
    medication_id int(11) not null,
    dosage decimal(4,2) not null,
    refil_count int,
    refil_frequency int,
    primary key (prescription_id),
    foreign key (customer_id) references customers(customer_id),
    foreign key (medication_id) references medications(medication_id)
);


-- Create prescription_status table

drop table if exists prescription_status;

create or replace table prescription_status (
    prescription_id int(11) not null,
    pharmacist_id int(11) not null,
    status varchar(255) not null,
    update_date timestamp not null default CURRENT_TIMESTAMP,
    primary key (prescription_id, update_date),
    foreign key (prescription_id) references prescriptions(prescription_id),
    foreign key (pharmacist_id) references pharmacists(pharmacist_id)
);


-- Insert data

lock tables pharmacists write;
lock tables customers write;
lock medications write;
lock prescriptions write;
lock prescription_status write;

-- Insert data into pharmacists table

insert into pharmacists (job_title, first_name, last_name, address, phone_number)
values 
    ('Pharmacist', 'John', 'Doe', '123 Main St', '555-555-1212'),
    ('Pharmacist', 'Jane', 'Doe', '456 Elm St', '555-555-1213'),
    ('Pharmacist', 'Jim', 'Smith', '789 Oak St', '555-555-1214'),
    ('Pharmacist', 'James', 'Johnson', '111 Elm St', '555-555-1215'),
    ('Pharmacist', 'Jennifer', 'Brown', '222 Main St', '555-555-1216'),
    ('Pharmacist', 'Jessica', 'Davis', '333 Oak St', '555-555-1217');


-- Insert data into customers table

insert into customers (first_name, last_name, address, phone_number)
values 
    ('Sarah', 'Johnson', '111 Main St', '555-555-1215'),
    ('Michael', 'Smith', '222 Elm St', '555-555-1216'),
    ('Emily', 'Brown', '333 Oak St', '555-555-1217'),
    ('William', 'Jones', '444 Main St', '555-555-1218'),
    ('Ashley', 'Miller', '555 Elm St', '555-555-1219'),
    ('David', 'Davis', '666 Oak St', '555-555-1220');


-- Insert data into medications table

insert into medications (name, description, quantity, stock, drug_class)
values 
    ('Aspirin', 'Pain reliever', '100mg', 200, 'NSAID'),
    ('Amoxicillin', 'Antibiotic', '250mg', 150, 'Penicillin'),
    ('Ibuprofen', 'Pain reliever', '200mg', 100, 'NSAID'),
    ('Acetaminophen', 'Pain reliever', '325mg', 200, 'NSAID'),
    ('Penicillin', 'Antibiotic', '500mg', 250, 'Penicillin'),
    ('Naproxen', 'Pain reliever', '500mg', 150, 'NSAID');


-- Insert data into prescriptions table

insert into prescriptions (customer_id, medication_id, dosage, refil_count, refil_frequency)
values 
    ((select customer_id from customers where first_name='Sarah' and last_name='Johnson'), 
     (select medication_id from medications where name='Aspirin'), 2, 3, 7),
    ((select customer_id from customers where first_name='Michael' and last_name='Smith'), 
     (select medication_id from medications where name='Amoxicillin'), 3, 2, 14),
    ((select customer_id from customers where first_name='Emily' and last_name='Brown'), 
     (select medication_id from medications where name='Ibuprofen'), 1, 5, 30),
((select customer_id from customers where first_name = 'John' and last_name = 'Smith'),
 (select medication_id from medications where name = 'Paracetamol'),
 500,
 2,
 30),
((select customer_id from customers where first_name = 'Jane' and last_name = 'Doe'),
 (select medication_id from medications where name = 'Ibuprofen'),
 600,
 3,
 45),
((select customer_id from customers where first_name = 'Bob' and last_name = 'Johnson'),
 (select medication_id from medications where name = 'Amoxicillin'),
 250,
 0,
 0),
((select customer_id from customers where first_name = 'Jane' and last_name = 'Doe'),
 (select medication_id from medications where name = 'Hydrocodone'),
 5,
 1,
 60);

-- Populating prescription_status table

insert into prescription_status (prescription_id, pharmacist_id, status) values
((select prescription_id from prescriptions where customer_id = (select customer_id from customers where first_name = 'John' and last_name = 'Smith')),
 (select pharmacist_id from pharmacists where first_name = 'John' and last_name = 'Doe'),
 'filled'),
((select prescription_id from prescriptions where customer_id = (select customer_id from customers where first_name = 'Jane' and last_name = 'Doe') and medication_id = (select medication_id from medications where name = 'Ibuprofen')),
 (select pharmacist_id from pharmacists where first_name = 'Jane' and last_name = 'Doe'),
 'filled'),
((select prescription_id from prescriptions where customer_id = (select customer_id from customers where first_name = 'Bob' and last_name = 'Johnson')),
 (select pharmacist_id from pharmacists where first_name = 'Mark' and last_name = 'Johnson'),
 'pending'),
((select prescription_id from prescriptions where customer_id = (select customer_id from customers where first_name = 'Jane' and last_name = 'Doe') and medication_id = (select medication_id from medications where name = 'Hydrocodone')),
 (select pharmacist_id from pharmacists where first_name = 'Mark' and last_name = 'Johnson'),
 'filled');


unlock tables;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;