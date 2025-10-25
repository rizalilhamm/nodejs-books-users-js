CREATE TABLE fundraisers (
    id int,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    Tenand varchar(255) not null,
    City varchar(255)
);

CREATE TABLE compains (
    id int,
    title varchar(255),
    fundraiser_id int not null,
    amounts BIGINT not null,
	currancy varchar(100),
    City varchar(255)
    FOREIGN KEY (fundraiser_id) REFERENCES fundraisers(id)
);

CREATE TABLE donaturs (
    id int,
    fullname varchar(100),
    firstName varchar(100),
    Tenand varchar(100),
    City varchar(100),
    currancy varchar(50)
    FOREIGN KEY (compain_id) REFERENCES compains(id)
);

-- solusi pertama
/*
1. lakukan concatenate setiap ada transaksi yang masuk
2. update column amounts
*/
select id,  title_campain, fundraiser_id, amounts from campain where funraiser_id = 123 order by amounts desc

/*
fundraiser_id adalah foreign key
*/


