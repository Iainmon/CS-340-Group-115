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
    update_date datetime not null,
    primary key (prescription_id, pharmacist_id),
    key prescription_id (prescription_id),
    foreign key (prescription_id) references prescriptions(prescription_id),
    foreign key (pharmacist_id) references pharmacists(pharmacist_id)
);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;