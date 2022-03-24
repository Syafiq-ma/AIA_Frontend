import React from "react";
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './styles/paging.css'

const Paging = (props) => {
    const pageNumbers = []
    const totalPage = Math.ceil(props.totalPhoto/props.photoPerPage)

    for(let i = 0; i<totalPage;i++){
        pageNumbers.push(i+1)
    }
    function beforePage(){
        props.nowPage>0?props.paginate(props.nowPage-1):props.paginate(props.nowPage)
    }
    function nextPage(){
        props.nowPage<totalPage?props.paginate(props.nowPage+1):props.paginate(props.nowPage)
    }
    return(
        <div className="paging">
            <IconButton color="primary" aria-label="Navigate before" onClick={()=>beforePage()}>
                <NavigateBeforeIcon/>
            </IconButton>
            {pageNumbers&&pageNumbers.map((n,i)=>(
                <button key={i} className="paging-button" onClick={()=>props.paginate(n)}>{n}</button>
            ))}
            <IconButton color="primary" aria-label="Navigate next" onClick={()=>nextPage()}>
                <NavigateNextIcon/>
            </IconButton>
        </div>
    )
}

export default Paging