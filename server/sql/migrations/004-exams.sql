

CREATE TABLE dailyExams (

    id          VARCHAR PRIMARY KEY , 
    st_id        VARCHAR NOT NULL , 
    date         VARCHAR NOT NULL ,
    examResult   INTEGER NOT NULL,
    FOREIGN KEY (st_id) REFERENCES students (id)
   
) ; 

CREATE TABLE monthlyExams (

    id           VARCHAR PRIMARY KEY , 
    st_id        VARCHAR NOT NULL , 
    date         VARCHAR NOT NULL , 
    examResult   INTEGER NOT NULL,

    FOREIGN KEY (st_id) REFERENCES students (id)
   
) ; 