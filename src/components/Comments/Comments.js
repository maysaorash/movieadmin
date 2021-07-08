import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { BsFileArrowDown, BsFileArrowUp, BsArrowUpDown } from "react-icons/bs";
import { BsFillEyeFill, BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Modal from "react-modal";
import { COLUMNS } from "./CommentsColumns";
import "./commentsTable.css";
import {Link} from 'react-router-dom'
import { GiConsoleController } from "react-icons/gi";
import { formatDistanceToNow } from "date-fns";
// import ReactImage from "react-image";
import './commentsTable.css'
Modal.setAppElement("#root");
export default function Comments() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPost, setModalPost] = useState("");
  // const [no, setNo] = useState("");
  const [authorFirstname, setAuthorFirstname] = useState("");
  const [authorLastname, setAuthorLastname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [userId , setUserId]=useState('')
  const [block, setBlock]=useState(false)
  const [reasonBlock, setReasonBlock]=useState('')
  console.log(reasonBlock)
  
  const viewCommentDetail = (commentId) => {
    console.log(data);
  };
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (e.target.value === "false") {
      setBlock(true);
    } else{
      setBlock('')
    }
    setIsActive(e.target.value)
  };
  const handleSubmit = (commentId) => {
    const updatedComment = {
      isActive,
     reasonToBlock:reasonBlock,
    };
  
    axios
      .put(
        `https://movieapp-server.herokuapp.com/comments/${commentId}`,
        updatedComment
      )
      .then((res) => {
        window.location.reload();
     })
      .catch((err) => {
        console.log(err);
      });
     
  };
 
  const editComment = async (commentId) => {
    await axios
      .get(`https://movieapp-server.herokuapp.com/comments/${commentId}`)
      .then((res) => {
        setModalPost(res.data.data);
        // setNo(res.data.data.no);
        setAuthorFirstname(res.data.data.userId.firstname);
        setAuthorLastname(res.data.data.userId.lastname);
        setTitle(res.data.data.title);
        setDescription(res.data.data.content);
        setCreatedAt(res.data.data.createdAt);
        setIsActive(res.data.data.isActive);
        setUserId(res.data.data.userId._id)
        setReasonBlock(res.data.data.reasonToBlock)
        console.log(res.data.data.reasonToBlock)
      })
      .catch((err) => {
        console.log(err);
      });
    setModalIsOpen(true);
  
  };
  const deleteComment = (commentId) => {
    axios
      .delete(`https://movieapp-server.herokuapp.com/comments/${commentId}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("https://movieapp-server.herokuapp.com/comments")
      .then((res) => {
        setData(res.data.response)
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const columns = useMemo(() => COLUMNS, []);
  const comments = useMemo(() => data, []);
  useTable({
    columns: columns,
    data: comments,
  });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <div className="outer">
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              top: 35,
              backgroundColor: "rgba(211, 211, 211, 0.60)",
              marginTop: "30px",
            },
            content: {
              padding: 2,
              height: 700,
              marginTop: "10px",
              backgroundColor: "#181818",
              border: "none",
              width: "70%",
              margin: "auto",
              paddingTop: "2%",
            },
          }}
        >
          <div className="modal-container">
            <p className="close-modal-x" onClick={() => setModalIsOpen(false)}>
              X
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(modalPost._id);
              }}
              className="modal-form"
            >
              {/* <div className="modal-column-one"></div> */}
              <div className="modal-column-two">
                <div>
                  <div>
                    <p>
                      {authorFirstname} {authorLastname}
                    </p>
                  
                    <p>{data.title}</p>
                    <p>{description}</p>
                    <p>{createdAt}</p>
                    <div className="active-block">
                    <select
                    style={{width: "7%", height:"30px", fontSize: "1.3rem"}}
                     value={isActive}
                      onChange={handleChange} >
                      <option value="true">Active</option>
                      <option value="false">Block</option> 
                      </select></div>
                  </div>
                </div>
                  
                { block? <div className="block-reason"><label>Reason block message!</label><input className='blockMessage' value={reasonBlock} type='text' onChange={(e)=>setReasonBlock(e.target.value)} /> </div>:"" }
                <div className="comment-update-button-container">
                  <button
                    className="comment-update-button submit-btn"
                    type="submit"
                  >
                    Submit
                  </button>
               
                  
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="commentlist-container">
        <h1 className="commentlist-title">Comment Lists</h1>
        <hr className="hr-comment" />
        <div className="search-show-bar-container">
          <div className="comment-show-bar">
            Show&nbsp;{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            &nbsp; entries
          </div>
          <div className="comment-search-bar">
            Search:&nbsp;&nbsp;
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
        </div>
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/> */}
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {/* <th></th> */}
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="comments-icon-container">
                      <div>{column.render("Header")}</div>
                      <div className="comments-sort-icon">
                        <BsArrowUpDown />
                      </div>
                    </div>
                  </th>
                ))}
                <th>ACTION</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                  <td className="row-icon-container">
                    
                    <Link  to={`/commentdetails/${row.original._id}`}>
                    <BsFillEyeFill className="view-trailer-icon eyefill-icon" />&nbsp; 
                    </Link>
                    &nbsp;
                    <BsPencilSquare
                      className="edit-comment-icon"
                      onClick={() => {
                        editComment(row.original._id);
                      }}
                      
                    />
                    &nbsp;
                    <BsFillTrashFill
                      className="delete-comment-icon"
                      onClick={() => {
                        deleteComment(row.original._id);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="comment-button-container">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button
            className="comment-page-nav"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <div className="comment-current-page">{pageIndex + 1}</div>
          <button
            className="comment-page-nav"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
