import React, { useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import {
    Link,
    Typography,
    makeStyles
} from "@material-ui/core";
import { SummaryComponent } from "../../components/common";


const useStyles = makeStyles((theme) => ({
    viewButton: {
        backgroundColor: "#02bfa0",
        color: "#fff",
        textAlign: "center",
        padding: theme.spacing(1),
        borderRadius: "10%",
        "&:hover": {
            backgroundColor: "#029a82",
        },
    },
    removePostLink: {
        textAlign: "center",
    },
}));

function JobList({ jobList }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <React.Fragment>
            { jobList && jobList.map((post) => {
                return (
                    <SummaryComponent
                        key={post.id}
                        cardTitle={post.title}
                        cardSubTitle1={
                            <Typography>Vacancies: {post.vacancies}</Typography>
                        }
                        cardSubTitle2={`Posted on: ${new Date(
                            post.createdAt
                        ).toLocaleDateString()}`}
                    >
                        <img src="" alt="" />
                        <Typography>{post.description}</Typography>
                        <Link
                            className={classes.viewButton}
                            variant="button"
                            href={`/recruiter/postedjobs/${post.id}`}
                            underline="none"
                        > View </Link>
                        <Link className={classes.removePostLink} variant="inherit">  Remove Post </Link>
                    </SummaryComponent>
                );
            })}
            <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </React.Fragment>
    )
}
export default JobList;