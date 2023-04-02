import React from 'react';
import Todolist from './components/Todolist';
import TabApp from './components/TabApp';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function App(){
    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h6">TODO APPLICATION</Typography>
                </Toolbar>
            </AppBar>
            <TabApp />
        </div>
    );
}

export default App;