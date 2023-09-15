import React from 'react';


function Footer() {
    const currentYear = new Date().getUTCFullYear();
    return (
        <footer class="bg-white py-4 mt-auto">
            <div class="container px-5">
                <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div class="col-auto"><div class="small m-0">Zlack.me © { currentYear }</div></div>
                    <div class="col-auto">
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;