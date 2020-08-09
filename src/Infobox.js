import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './Infobox.css';
import numeral from 'numeral';


function Infobox({ title, cases, total, onClick, active, caseType,updated }) {
    return (
        <div onClick={onClick}
            className={`infobox ${active && 'infobox__active'} ${caseType}`} >
            <Card>
                <CardContent>
                    <Typography className="infobox__title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className="infobox__cases">
                        { numeral(total).format("0.0a") }
                    </h2>
                    <Typography className="infobox__total" color="textSecondary">
                        {cases ? "+" + numeral(cases).format("0.0a") : "+0"}

                    </Typography>
                    <Typography className="infobox__updated" color="textSecondary">
                        {new Date(updated).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </div >
    )
}

export default Infobox
