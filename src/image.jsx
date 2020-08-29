import React from 'react'

export default function Image(props) {
    let imgURL = `https://storage.googleapis.com/`
     return props.img.map((result) =>
     <div class="column"> 
         <img key={result.id} src ={imgURL+result.bucket+'/'+result.object} style={{width:200}}>
            </img>  
            <button onClick = { (event) => props.deleteImage(result.id)}>Delete</button>
    </div>
    );

}
