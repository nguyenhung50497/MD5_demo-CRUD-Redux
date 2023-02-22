<>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-7 mx-auto">
                    {blogs !== undefined && blogs.map(item => (
                        <div className="card" style={{width: '50%', margin: '20px'}}>
                            <img key={item._id} src={item.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h1>{item.title}</h1>
                                <p className="card-text"
                                   style={{color: 'orange'}}>{item.Account !== undefined && item.Account.username} | {item.time_update} | {item.status}</p>
                                <p className="card-text">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        {(page1 == 1) ?
                            <>
                                <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&laquo;</span></div>
                            </>
                            :
                            <>
                                <div  className="page-link" onClick={() => {
                                    dispatch(getBlogs(page1 - 1));
                                    navigate('/home?page='+(page1-1))
                                }
                                }> <span aria-hidden="true">&laquo;</span>
                                </div>
                            </>
                        }
                    </li>
                    <li className="page-item"><a className="page-link">{page1}/{totalPages}</a></li>
                    <li className="page-item">
                        {(page1 == totalPages) ?
                            <>
                            <>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-7 mx-auto">
                    {blogs !== undefined && blogs.map(item => (
                        <div className="card" style={{width: '50%', margin: '20px'}}>
                            <img key={item._id} src={item.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h1>{item.title}</h1>
                                <p className="card-text"
                                   style={{color: 'orange'}}>{item.Account !== undefined && item.Account.username} | {item.time_update} | {item.status}</p>
                                <p className="card-text">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        {(page1 == 1) ?
                            <>
                                <div className="page-link"><span aria-hidden="true" style={{color:'black'}}>&laquo;</span></div>
                            </>
                            :
                            <>
                                <div  className="page-link" onClick={() => {
                                    dispatch(getBlogs(page1 - 1));
                                    navigate('/home?page='+(page1-1))
                                }
                                }> <span aria-hidden="true">&laquo;</span>
                                </div>
                            </>
                        }
                    </li>
                    <li className="page-item"><a className="page-link">{page1}/{totalPages}</a></li>
                    <li className="page-item">
                        {(page1 == totalPages) ?
                            <>
</>