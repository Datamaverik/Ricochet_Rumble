export function addPieces(squares,id,tileId){
    Array.from(squares).forEach(square =>{
        //adding titan
        if(square.id==tileId){
            const titan = document.createElement('div');
            titan.setAttribute("id",id);
            titan.classList.add('pieces');
            titan.style.backgroundColor='red';
            titan.textContent='Titan';
            square.appendChild(titan);
        }
    })
}

export function remPieces(squares,tileId){
    console.log(tileId);
    Array.from(squares).forEach(square=>{
        if(square.id==tileId){
            square.innerHTML="";
            console.log('removed');
        }
    })
}