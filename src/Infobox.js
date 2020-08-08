import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './Infobox.css';
import numeral from 'numeral';


function Infobox({ title, cases, total, onClick, active,caseType }) {
    return (
        <div onClick={onClick}
            className={`infobox ${active && 'infobox__active'} ${caseType}`} >
            <Card>
                <CardContent>
                    <Typography className="infobox__title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className="infobox__cases">{
                        cases ?
                            "+" + numeral(cases).format("0.0a") : "+0"
                    }</h2>
                    <Typography className="infobox__total" color="textSecondary">
                        {numeral(total).format("0.0a")}
                    </Typography>
                </CardContent>
            </Card>
        </div >
    )
}

export default Infobox
