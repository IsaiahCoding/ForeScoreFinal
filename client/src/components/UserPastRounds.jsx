import React, { useState, useEffect } from 'react';
import PastRoundForm from './PastRoundForm';
import PastRounds from './PastRounds';


function PastRound() {
    return(

        <div>
            <PastRoundForm />
            <PastRounds />
        </div>
    )
}


export default PastRound;