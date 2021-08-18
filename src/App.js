import React, {useState, useEffect} from 'react';
import {Posts} from './components/Posts';
import axios from 'axios';
import './App.css';
import {Table, Pagination as AntPagination} from 'antd';
import "antd/dist/antd.css";
import {Pagination} from './components/Pagination';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
    }, []);

    // Get Current Posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Column
    const columns = [
        {
            key: "1",
            title: 'ID',
            dataIndex: 'id'
        },{
            key: "2",
            title: 'Title',
            dataIndex: 'title'
        },{
            key: "3",
            title: 'Body',
            dataIndex: 'body'
        }
    ]
    return (
        <div className="container mt-5">
            <h1 className="text-primary mb-3">My Blog</h1>
            <Table
                posts={currentPost}
                loading={loading}
                columns={columns}
                dataSource={posts}
                pagination={{ 
                    size: 'small', 
                    position: ['bottomCenter'],
                    defaultPageSize: 20,
                    pageSizeOptions: ['20', '50', '70']
                }}
            />
            <AntPagination 
                total={posts.length}
                size='small'
                style={{
                    position: ['bottomCenter']
                }}
                defaultPageSize={20}
                pageSizeOptions={['20', '50', '70']}
            />

            <p style={{padding: 50}}/>
            
            <Posts posts={currentPost} loading={loading}/>
            <Pagination
                postsPerpage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}/>
        </div>
    );
}

export default App;
