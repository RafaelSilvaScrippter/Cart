export function customResponse(res){
    res.status = (code) =>{
        res.statusCode = code
        return res
    };
    res.json = (value) =>{
         res.end(JSON.stringify(value))
    }
    return res
}