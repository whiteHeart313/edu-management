
/*
SQLite does not have a storage class for storing dates and/or times. Instead, 
the built-in Date and Time Functions of SQLite are capable of storing dates and times as TEXT, REAL, or INTEGER
**/



CREATE TABLE attendence (

    id 
         VARCHAR PRIMARY KEY , 
    st_id        VARCHAR NOT NULL , 
    date         INTEGER NOT NULL , 
    FOREIGN KEY (st_id) REFERENCES students (id)
   
) ; 
