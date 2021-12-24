import React from 'react';
import "../index.css";

export const Item = ({id, title, naiyou, point, email, keiro,place}) => {
    return (
        <tr className="fireItem">
            <th>{"id"}</th>
            <td>{id}</td>
            <th>{"title"}</th>
            <td>{title}</td>
            <th>{"naiyou"}</th>
            <td>{naiyou}</td>
            <th>{"point"}</th>
            <td>{point}</td>
            <th>{"keiro"}</th>
            <td>{keiro}</td>
            <th>{"place"}</th>
            <td>{place}</td>
            


            {/* <div>{id}</div>
            <div>{title}</div>
            <div>{naiyou}</div>
            <div>{point}</div>
            <div>{email}</div>
            <div>{keiro}</div>
            <div>{place}</div> */}
        </tr>
    )
}

export default Item;
