DROP TABLE attendence ; 

CREATE TABLE attendence (

    id          VARCHAR PRIMARY KEY , 
    st_id        VARCHAR NOT NULL , 
    date         VARCHAR NOT NULL , 
    FOREIGN KEY (st_id) REFERENCES students (id)
   
) ; 