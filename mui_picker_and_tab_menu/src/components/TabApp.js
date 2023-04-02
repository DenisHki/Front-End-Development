import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Todolist from './Todolist';

function TabApp() {
    const [value, setValue] = useState('home');
    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="home" label="HOME" />
                <Tab value="todos" label="TODOS" />
                
            </Tabs>
            {value === 'home' && <div><h1>Welcome to my Todo App!</h1></div>}
            {value === 'todos' && <div><Todolist /></div>}
            
        </div>
);
}

export default TabApp;
    