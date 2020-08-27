import React from 'react'

export default function Image(props) {
    let imgURL = `https://storage.googleapis.com/album-image/`
     return props.img.map((result, index) =>
        <img key={index} src ={imgURL+result} style={{width:200}}>
        </img>
    );

}
