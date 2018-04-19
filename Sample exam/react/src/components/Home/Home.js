import React from 'react';

const Home = () => {
    var imgstyle = {
        width: 600
    };

    return(
        <div>
            <div>
                <img src='../../../resources/banner.jpg' alt="" style={imgstyle}/>
            </div>
            <div>
                <h1>Company information</h1>
                <p>Oddi is a private limited company, registered, both in the Limited Company Register and also in the Professional Register, which is hosted by the Reykjavik District Commissioner.

                    Oddi prentun og umbudir ehf.
                    Hofdabakki 7
                    110 Reykjavik.
                    Tel.: 515 5000
                    Id no.: 701205-3240
                    Vat number: 11184
                    oddi@oddi.is

                    Pay us a visit! We are here
                    </p>
            </div>

        </div>
        
    );
}
export default Home;