// import React, { useState, useContext } from 'react';
// import { GlobalContext } from '../context/GlobalState';

// export default function AddTransaction() {
//     const [text, setText] = useState('');
//     const [Amount, setAmount] = useState(0);

//     const { addTransaction } = useContext(GlobalContext);

//     const onSubmit = e => {
//         e.preventDefault();
//         console.log(text,Amount)

//         const newTransaction = {
//             id: Math.floor(Math.random() * 1000000),
//             text,
//             Amount:+Amount
//         };
//         console.log(newTransaction);

//         addTransaction(newTransaction);
//     };

//     return (
//         <>
//             <h3>Add new transaction</h3>
//             <form onSubmit={onSubmit}>
//                 <div className="form-control">
//                     <label htmlFor="text">Text</label>
//                     <input
//                         type="text"
//                         id="text"
//                         value={text}
//                         onChange={e => setText(e.target.value)}
//                         placeholder="Enter text..."
//                         required
//                     />
//                 </div>
//                 <div className="form-control">
//                     <label htmlFor="amount">
//                         Amount <br />
//                         (negative - expense, positive - income)
//                     </label>
//                     <input
//                         type="number"
//                         id="amount"
//                         value={Amount}
//                         onChange={e => setAmount(e.target.value)}
//                         placeholder="Enter amount..."
//                         required
//                     />
//                 </div>
//                 <button className="btn" type="submit">
//                     Add transaction
//                 </button>
//             </form>
//         </>
//     );
// }

import React, { useState, useContext } from 'react';
import axios from 'axios'; // Import Axios
import { GlobalContext } from '../context/GlobalState'; // Import the GlobalContext

export default function AddTransaction() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const { addTransaction } = useContext(GlobalContext); // Access addTransaction function from the GlobalContext

    const onSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/transactions', { text, amount }); // Use Axios to make a POST request

            if (!response.data.transaction) {
                throw new Error('Invalid response from the server: no transaction found');
            }

            addTransaction(response.data.transaction);
            console.log('Transaction added successfully:', response.data.transaction);
        } catch (error) {
            console.error('Error adding transaction:', error);
            // Optionally, you can display an error message to the user here
        }
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input
                        type="text"
                        id="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Enter text..."
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                        required
                    />
                </div>
                <button className="btn" type="submit">
                    Add transaction
                </button>
            </form>
        </>
    );
}
