import React from 'react';
import './App.scss';
import Main from './components/Main/Main'
import Post from './components/Post/Post'
import Category from './components/Category/Category'
import PostID from './components/PostID/PostID'
import {BrowserRouter, Routes, Route} from 'react-router';
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="Category" element={<Category />} />
                    <Route path="Post" element={<Post />} />
                    <Route path="/post/:id" element={<PostID />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
