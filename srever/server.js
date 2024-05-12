import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host : "localhost",
    user:"root",
    password:"DBMS",
    database:'test'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle disconnect event
db.on('error', (err) => {
    console.error('MySQL connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconnecting to MySQL...');
        db.connect();
    } else {
        throw err;
    }
});

// Perform database operations here

// Close the database connection when done
// Note: In a real-world application, you might not want to close the connection immediately.
// It depends on your application's needs.
// db.end();


app.get('/',(req,res)=>{
    const sql = "SELECT * FROM student";
    db.query(sql,(err,result)=>{
        if(err) return res.json({message:"Internal server error"});
        else return res.json(result);
    })
})

app.post('/student',(req,res)=>{
    const sql = "INSERT INTO student (`Name`,`Specialities`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.specialities
    ];
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/read/:id',(req,res)=>{
    const sql = "SELECT * FROM student where ID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Internal server error"});
        else return res.json(result);
    })
})

app.put('/update/:id',(req,res)=>{
    const sql = 'UPDATE student SET `Name`=?, `Specialities`=? WHERE ID=?';
    const id = req.params.id;
    db.query(sql,[req.body.name,req.body.specialities,id],(err,result)=>{
        if(err) return res.json({Message:"Internal server error"});
        return res.json(result);
    })
})

app.delete(`/delete/:id`,(req,res)=>{
    const sql = "DELETE FROM student WHERE ID=?";
    const id = req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"Internal server error"});
        else return res.json(result);
    })
})

const port = 8081 ;
app.listen(port,()=>{
    console.log(`Listening to the  port http://localhost:${port}`);
})