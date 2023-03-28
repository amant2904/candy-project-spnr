import React, { useContext, useState } from 'react'
import CandyContext from '../store/candy-context';
import CartContext from '../store/cart-context';

export default function CandyListItem(props) {
    const candyCtx = useContext(CandyContext);

    const removeCandy_handler = async (e) => {
        e.preventDefault();
        const candyId = e.target.parentElement.firstElementChild.textContent;
        try {
            const res = await fetch(candyCtx.api_url + "/" + candyId, {
                method: 'DEconstE'
            })
            if (!res.ok) {
                throw new Error("Unable to deconste Candy from List")
            }
            candyCtx.removeCandy_handler(candyId);
        }
        catch (err) {
            alert(err.message);
        }
    }

    const [cartId, setCartId] = useState(null);
    const cartCtx = useContext(CartContext);

    const addInCart_handler = async (e) => {
        e.preventDefault();
        const candyQuantity = parseInt(e.target.id);

        const candyName = e.target.parentElement.parentElement.children[1].textContent;
        const candyDescr = e.target.parentElement.parentElement.children[2].textContent;
        const candyPrice = e.target.parentElement.parentElement.children[3].textContent;

        const itemDetail = {
            name: candyName,
            descr: candyDescr,
            price: candyPrice,
            quantity: candyQuantity
        }

        if (cartId) {
            try {
                const prv = await fetch(candyCtx.api_url + "/Cart2/" + cartId);
                const prvData = await prv.json();
                const res = await fetch(candyCtx.api_url + "/Cart2/" + cartId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        name: candyName,
                        descr: candyDescr,
                        price: candyPrice,
                        quantity: candyQuantity + parseInt(prvData.quantity)
                    })
                })
                if (!res.ok) {
                    throw new Error("unable to update item in cart");
                }
                // cartCtx.addInCart()
            }
            catch (err) {
                console.log(err);
                alert(err.message);
            }
        }
        else {
            try {
                const res = await fetch(candyCtx.api_url + "/cart2", {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(itemDetail)
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error("Unable to add in cart")
                }
                setCartId(data._id);
                cartCtx.addInCart(data);
            }
            catch (err) {
                alert(err.message);
            }
        }

    }

    return (
        <li style={{ border: "1px solid black", padding: "5px" }}>
            <p>{props.detail._id}</p>
            <p>{props.detail.name}</p>
            <p>{props.detail.desc}</p>
            <p>{props.detail.price}</p>
            <button onClick={removeCandy_handler}>delete candy</button>
            <div style={{ margin: "10px 0px", padding: "10px" }}>
                <button onClick={addInCart_handler} id="1">Add one</button>
                <button onClick={addInCart_handler} id="2">Add Two</button>
                <button onClick={addInCart_handler} id="3">Add Three</button>
            </div>
            <p>{cartId}</p>
        </li>
    )
}
