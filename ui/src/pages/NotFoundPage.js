import React from 'react';

function NotFoundPage() {
    return (
        <>
        <section class="bg-light py-5">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-xxl-8">
                        <div class="text-center my-5">
                            <h2 class="display-5 fw-bolder"><span class="text-gradient d-inline">404</span></h2>
                            <p class="lead fw-light mb-4">Err....nothing is here!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    );
}

export default NotFoundPage;