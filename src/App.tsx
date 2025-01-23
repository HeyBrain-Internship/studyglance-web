import React, {useState} from 'react';
import './App.css';

function MainPage()
{
    const [isStartPage, setIsStartPage]   = useState<boolean>(true);
    const [selectedItem, setSelectedItem] = useState('');
    const items                           = ['Grade Kindergarten',
                                             'Grade 1',
                                             'Grade 2',
                                             'Grade 3',
                                             'Grade 4',
                                             'Grade 5',
                                             'Grade 6',
                                             'Grade 7',
                                             'Grade 8'];

    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) =>
    {
        setSelectedItem(event.target.value);
        console.log('You selected: ', event.target.value);
    }

    const buttonStartClick = async () =>
    {
        setIsStartPage(false);
        try
        {
            const response = await fetch("http://localhost:8080/get");
            const data = await response.json();
            console.log(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    return (
        <div>
            <div style={{display : isStartPage ? 'block' : 'none'}}>
                <label htmlFor="dynamic_dropdown">
                    <h2>Select grade:</h2>
                </label>
                <select
                    id="dynamic_dropdown"
                    value={selectedItem}
                    onChange={handleChange}
                    className="dynamic-dropdown"
                >
                    <option value="" disabled>
                        Select a grade
                    </option>
                    {items.map((item,
                                index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <br/>
                <br/>
                <button onClick={buttonStartClick}>Start</button>
            </div>
            <div style={{display : isStartPage ? 'none' : 'block'}}>
                <p>
                    <h1>Let's study!</h1>
                </p>
                <button onClick={() => setIsStartPage(true)}>Back to start menu</button>
            </div>
        </div>);
}

export default MainPage;
