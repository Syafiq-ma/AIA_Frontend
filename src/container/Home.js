import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

import { useHttpClient } from '../hooks/http-hooks'

import './styles/home.css'
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paging from '../components/Paging';

const Home = () => {
    const {isLoading, error, sendRequest} = useHttpClient()
    const [data,setData] = useState([])
    const [search,setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [photoPerPage, setPhotoPerPage] = useState(5)
    useEffect(()=>{
        const photosData = sendRequest( 'https://find-photos-aia.herokuapp.com/api/data')
        Promise.all([photosData])
        .then(res=>{
            setData(res[0])
        })
    },[])

    function searching(props){
        const searchData = sendRequest(
            'https://find-photos-aia.herokuapp.com/api/search',
            'POST',
            JSON.stringify({text:search}),
            {'Accept': 'application/json', 'Content-Type': 'application/json'}
        )
        Promise.all([searchData])
        .then(res=>{
            setData(res[0])
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [currentPage]);

    const indexLastPhoto = (currentPage*photoPerPage)
    const indexFirstPhoto = indexLastPhoto-photoPerPage
    const currentData = data.slice(indexFirstPhoto,indexLastPhoto)
    const paginate = (page) => setCurrentPage(page)
    const lengthData = data.length
    if (isLoading){
        return(
            <h1 style={{textAlign:'center', marginTop:'50px'}}>Loading ...</h1>
        )
    }
    if (error){
        return(
            <h1>{error}</h1>
        )
    }
    return(
        <div>
            <div data-testid="title" className='home-title'>Find Photos</div>
            <div className='home-search-wrapper'>
                <div className='home-search'>
                    <div style={{marginRight:'30px', width:'35vw'}}>
                    <TextField
                        placeholder='Search here'
                        data-testid='searchbar'
                        fullWidth
                        id="outlined-basic" 
                        size="small" 
                        variant="outlined"
                        value={search}
                        onChange={e=>setSearch(e.target.value)}
                        onSubmit={e=>searching(e)}
                    />
                    </div>
                    <Button disabled={search?false:true} data-testid='searchbutton' onClick={e=>searching(e)} variant="contained" startIcon={<SearchIcon/>}>Search</Button>
            </div>
            </div>
            <div className='home-post-wrapper'>
                <div className='home-post'>
                    {currentData&&currentData.map((d,i)=>(
                        <Post
                            key={i}
                            owner={d.photoOwner}
                            ownerPhoto={d.photoOwnerURL}
                            title={d.photoTitle}
                            publish={d.photoPublished}
                            photo={d.photoStaticURL}
                            tags={d.photoTags}
                        />
                    ))}
                </div>
            </div>
            <div className='home-pagination'>
                <Paging
                    totalPhoto={lengthData}
                    photoPerPage={photoPerPage}
                    nowPage={currentPage}
                    paginate={paginate}
                />
            </div>
        </div>
    )
}

export default Home