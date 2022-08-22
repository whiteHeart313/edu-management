CREATE TABLE monthlyMoney (

    id          VARCHAR PRIMARY KEY , 
    st_id        VARCHAR NOT NULL , 
    date         VARCHAR NOT NULL ,
    money        INTEGER NOT NULL,
    FOREIGN KEY (st_id) REFERENCES students (id)
   
) ; 

CREATE TABLE booksMoney (

    id           VARCHAR PRIMARY KEY , 
    st_id        VARCHAR NOT NULL , 
    date         VARCHAR NOT NULL , 
    money        INTEGER NOT NULL,

    FOREIGN KEY (st_id) REFERENCES students (id)
   
) ; 