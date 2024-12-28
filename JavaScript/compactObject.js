var compactObject = function(obj) {
    let compact = function(obj){
        if(typeof obj==="object" && obj!==null){
            if(Array.isArray(obj)){
                for(let i=0;i<obj.length;i++){
                    compact(obj[i]);
                    if(!obj[i]){
                        obj.splice(i,1);
                        i--;
                    }
                }
            } else {
                for(let key in obj){
                    compact(obj[key]);
                    if(!obj[key]){
                        delete obj[key]
                    }
                }
            }
        }

    }
    compact(obj);
    return obj;
    
};
