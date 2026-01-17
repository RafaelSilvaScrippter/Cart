const response = await fetch('http://localhost:3001/produtos',{
    method:'POST',
    body:JSON.stringify({nome:"MILIO"})
})
console.log(response)